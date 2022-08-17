/* global cc */

// eslint-disable-next-line no-unused-vars
class Utils {
  constructor(options) {
    this.windowSize = options.windowSize;
    this.resourcesDir = options.resourcesDir;
    this.resourcesLangDir = options.resourcesLangDir;
    this.layer = null;
    this.preloadedResources = [];
  }

  preload(resources) {
    for (const resource of resources) {
      const img = document.createElement("img");
      img.src = resource;
      img.style.visibility = "hidden";
      document.body.appendChild(img);

      this.preloadedResources.push(resource);
    }
  }

  setLayer(layer) {
    this.layer = layer;
  }

  res(resourcesPath) {
    return `${this.resourcesDir}/${resourcesPath}`;
  }

  langRes(resourcesPath) {
    return `${this.resourcesLangDir}/${resourcesPath}`;
  }

  addMenuButton(resource, position, callback) {
    const pressedButtonFilename = resource.replace(".png", " (pressed).png");

    if (this.preloadedResources.includes(resource) === false) {
      console.warn(`${resource} was not preloaded.`);
    }

    let pressedResource;
    if (this.preloadedResources.includes(pressedButtonFilename)) {
      pressedResource = pressedButtonFilename;
    } else {
      console.log(
        `Not using a pressed state for ${resource} since one was not preloaded`
      );
      pressedResource = resource;
    }

    const menuItemImage = new cc.MenuItemImage(
      resource,
      pressedResource,
      callback
    );

    menuItemImage.setAnchorPoint(...position.anchor);
    menuItemImage.setPosition(position.point);

    const menu = new cc.Menu(menuItemImage);
    menu.setPosition(cc.p(0, 0));
    this.layer.addChild(menu);

    return menu;
  }

  addSprite(resource, position = null) {
    if (this.preloadedResources.includes(resource) === false) {
      console.warn(`${resource} was not preloaded.`);
    }

    const sprite = cc.Sprite.create(resource);

    if (position === null) {
      position = this.xcyc();
    }

    sprite.setAnchorPoint(...position.anchor);
    sprite.setPosition(position.point);

    this.layer.addChild(sprite);
    return sprite;
  }

  // x-axis centered, y with an offset from the top.
  // eslint-disable-next-line no-unused-vars
  xcyo(yOffset) {
    return {
      anchor: [0.5, 1],
      point: cc.p(this.windowSize.width / 2, this.windowSize.height - yOffset),
    };
  }

  xcyc() {
    return {
      anchor: [0.5, 0.5],
      point: cc.p(this.windowSize.width / 2, this.windowSize.height / 2),
    };
  }

  xoyo(xOffset, yOffset) {
    return {
      anchor: [0, 1],
      point: cc.p(xOffset, this.windowSize.height - yOffset),
    };
  }
}
