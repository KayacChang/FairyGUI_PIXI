# PIXI_FairyGUI

### Description

> [FairyGUI][9] is a Visualization Editor For Game Development.  
> [PixiJS][10] is a render library for create rich, interactive graphic.  
> This library create an interface between both to make development easier.

### Table of Contents

-   [addPackage][1]
    -   [Notice][2]
    -   [Usage][3]
    -   [Example][4]
    -   [Parameters][5]
-   [create][6]
    -   [Parameters][7]

## addPackage

>  Analysing Fairy Config File
>  and return a function for create Entities with specify name.

### Notice

>  Make sure all Resources used by the package were loaded.
>  This Function use PIXI.Application built-in loader
>  to fetch necessary resources.

### Usage

>  This function will fetch that file from loader
>  and return a factory function.

### Example

    // Suppose your config filename is package1.fui
    const create = addPackage(app, 'package1');

    // Suppose 'main' is your component name.
    const mainComp = create('main');

    app.stage.addChild(mainComp);

### Parameters

-   `app` **PIXI.Application** 
-   `packageName` **[string][8]** 

Returns **function ([string][8]): PIXI.Container** 

## create

> The Function create can take specify component name,
> which you created by fairyGUI Editor
> and return the PIXI.Container for that entity.

### Parameters

-   `resName` **[string][8]** 

Returns **PIXI.Container** 

[1]: #addpackage

[2]: #notice

[3]: #usage

[4]: #example

[5]: #parameters

[6]: #create

[7]: #parameters-1

[8]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[9]: http://www.fairygui.com/

[10]: http://www.pixijs.com/
