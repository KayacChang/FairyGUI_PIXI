// @flow
import {
  propSatisfies, includes, propEq, map,
} from 'ramda';

import {toPair} from '../../util';

import {assign} from './assign';

import {divide} from 'mathjs';

import {placeHolder} from './index';

import {BLEND_MODES, extras, Texture, filters} from 'pixi.js';

const {AnimatedSprite} = extras;
const {ColorMatrixFilter} = filters;

import {getAtlasName} from './index';

import {Component} from '../override/Component';
import {string2hex} from '../../core';

function toAnimationSpeed({attributes}) {
  const {interval} = attributes;

  const ms = 16.6;

  return divide(ms, Number(interval));
}

function getOffsetPerFrame(source) {
  const el = source.elements[0].elements;

  return map((obj) => toPair(obj.attributes.rect))(el);
}

function toFrames(src) {
  let textureConfigs =
    temp.selectTexturesConfig(propSatisfies(includes(src), 'id'));

  textureConfigs =
    textureConfigs.map((config) => {
      config.index = Number(config.id.split('_')[1]);
      return config;
    })
      .sort((a, b) => a.index - b.index);

  return map(toAnimationFrame)(textureConfigs);

  function toAnimationFrame({id, binIndex, frame}) {
    const atlasName = getAtlasName(id, binIndex);

    const {file} = temp.selectResourcesConfig(propEq('id', atlasName));

    const {baseTexture} = temp.getResource(file).texture;

    return new Texture(baseTexture, frame);
  }
}

/*
 *  Mapping MovieClip Type to PIXI.extra.AnimatedSprite
 */
function movieclip({attributes}) {
  const source = temp.getSource(attributes.src);

  const offsets = getOffsetPerFrame(source);

  const frames = toFrames(attributes.src, offsets);

  const anim = new AnimatedSprite(frames);

  const maxFrame = frames.reduce((a, b) => {
    const rectA = a.width * a.height;
    const rectB = b.width * b.height;
    return rectA > rectB ? a : b;
  });

  const placeholder = placeHolder(maxFrame.width, maxFrame.height);

  const it = Component();
  it.addChild(placeholder, anim);

  anim.animationSpeed = toAnimationSpeed(source);

  anim.onFrameChange = function(currentFrame) {
    const [offsetX, offsetY] = offsets[currentFrame];

    anim.position.x = offsetX * anim.scale.x;
    anim.position.y = offsetY * anim.scale.y;

    anim.emit('change', currentFrame);

    if (currentFrame === frames.length - 1) {
      anim.emit('complete');
    }
  };

  anim.gotoAndStop(frames.indexOf(maxFrame));

  it.anim = anim;

  anim.play();

  //  Filter
  if (attributes.filter === 'color') {
    let [
      brightness, contrast, saturate, hue,
    ] = toPair(attributes.filterData);

    const filter = new ColorMatrixFilter();

    if (brightness) {
      filter.brightness(brightness);
    }
    if (contrast) {
      filter.contrast(contrast);
    }
    if (saturate) {
      filter.saturate(saturate);
    }
    if (hue) {
      hue = (hue * 180) - 5;
      filter.hue(hue);
    }

    it.filters = [filter];
  }

  //  Blend Mode
  if (attributes.blend) {
    const blendMode = BLEND_MODES[attributes.blend.toUpperCase()];

    if (attributes.filter) {
      it.filters[0].blendMode = blendMode;
    } else {
      it.anim.blendMode = blendMode;
    }
  }

  //  Color
  if (attributes.color) {
    it.anim.tint = string2hex(attributes.color);
  }

  return assign(it, attributes);
}

export {movieclip};
