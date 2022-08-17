/* global cc, $, Utils */

const language = "uy";
const debug = true; // TODO: Remove

// Links.
const freeTrialLink = "https://www.acuvue.co.uk/get-contact-lenses/free-trial-contact-lenses";
const learnMoreLink = "https://www.acuvue.co.uk/eye-problems/astigmatism";
const tsAndCsLink   = "https://www.acuvue.co.uk/terms-conditions";

// Window size.
let winSize;

// Cocos object.
let main;

// Utils object.
let u;

let targetPositionY;
let targetPositionX;
let status;

window.onload = function () {
  cc.game.onStart = function () {
    cc.director.setProjection(cc.Director.PROJECTION_3D);
    const policy = new cc.ResolutionPolicy(
      cc.ContainerStrategy.PROPORTION_TO_FRAME,
      cc.ContentStrategy.SHOW_ALL
    );
    cc.view.setDesignResolutionSize(1080, 1920, policy);
    cc.view.resizeWithBrowserSize(true);
    cc.view.enableAutoFullScreen(true);
    cc.director.setDisplayStats(false);

    u = new Utils({
      windowSize: cc.director.getWinSize(),
      resourcesDir: "resources",
      resourcesLangDir: `resources/${language}`,
    });

    u.preload([
      u.langRes("part2bg.png"),
      u.langRes("get-a-free-trial.png"),
      u.langRes("get-a-free-trial (pressed).png"),
      u.langRes("start-button.png"),
      u.langRes("start-button (pressed).png"),
      u.langRes("get-a-free-trial.png"),
      u.langRes("get-a-free-trial (pressed).png"),
      u.langRes("background.png"),
      u.langRes("glasses-or-contacts-background.png"),
      u.langRes("wearing-glasses.png"),
      u.langRes("wearing-glasses (pressed).png"),
      u.langRes("wearing-contacts.png"),
      u.langRes("wearing-contacts (pressed).png"),
      u.res("progress-indicator-off.png"),
      u.res("progress-indicator-on.png"),
      u.langRes("contacts-guide-text1.png"),
      u.langRes("contacts-guide-text2.png"),
      u.langRes("contacts-guide-text3.png"),
      u.langRes("contacts-guide-image1.png"),
      u.langRes("contacts-guide-image2.png"),
      u.langRes("contacts-guide-image3.png"),
      u.langRes("background.png"),
      u.langRes("back-button.png"),
      u.langRes("back-button (pressed).png"),
      u.langRes("next-button.png"),
      u.langRes("next-button (pressed).png"),
      u.langRes("go-button.png"),
      u.langRes("go-button (pressed).png"),
      u.res("glasses.png"),
      u.res("hand.png"),
      u.res("loading-spinner.png"),
      u.langRes("loading-text-next-eye.png"),
      u.langRes("loading-text-complete.png"),
      u.langRes("loading-text-close-left-eye.png"),
      u.langRes("loading-text-close-right-eye.png"),
      u.res("progress-indicator-small-on.png"),
      u.res("progress-indicator-small-off.png"),
      u.langRes("contacts-test-text1.png"),
      u.langRes("contacts-test-text2.png"),
      u.langRes("contacts-test-text3.png"),
      u.langRes("contacts-test-text4.png"),
      u.res("contacts-test-background.png"),
      u.res("arrow.png"),
      u.res("box_n.png"),
      u.langRes("yes-button.png"),
      u.langRes("yes-button (pressed).png"),
      u.langRes("no-button.png"),
      u.langRes("no-button (pressed).png"),
      u.langRes("next-button-wide.png"),
      u.langRes("next-button-wide (pressed).png"),
      u.langRes("glasses-test-text1.png"),
      u.langRes("glasses-test-text2.png"),
      u.langRes("glasses-test-text3.png"),
      u.langRes("glasses-test-text4.png"),
      u.langRes("glasses-test-background.png"),
      u.langRes("glasses-guide-text1.png"),
      u.langRes("glasses-guide-text2.png"),
      u.langRes("glasses-guide-text3.png"),
      u.langRes("glasses-guide-text4.png"),
      u.langRes("glasses-guide-image1.png"),
      u.langRes("glasses-guide-image2.png"),
      u.langRes("glasses-guide-image3.png"),
      u.langRes("glasses-guide-image4.png"),
      u.langRes("go-button-wide.png"),
      u.langRes("go-button-wide (pressed).png"),
      u.res("camera-button.png"),
      u.res("light-photo.png"),
      u.res("result-background.png"),
      u.langRes("download-free-trial-voucher.png"),
      u.langRes("download-free-trial-voucher (pressed).png"),
      u.langRes("learn-more-about-astigmatism.png"),
      u.langRes("learn-more-about-astigmatism (pressed).png"),
      u.langRes("terms-and-conditions.png"),
      u.langRes("result-no-astigmatism.png"),
      u.langRes("result-astigmatism-left.png"),
      u.langRes("result-astigmatism-right.png"),
      u.langRes("result-astigmatism-both.png"),
    ]);

    cc._loaderImage = u.langRes("part2bg.png");

    function initEventHandler() {
      function disableclick(event) {
        if (event.button === 2) {
          alert(status);
          return false;
        }
      }

      if (debug === false) {
        $(document).ready(function () {
          $(document).bind("keydown", function (e) {
            if (e.keyCode === 123 /* F12 */) {
              e.preventDefault();
              e.returnValue = false;
            }
          });
        });
        document.onmousedown = disableclick;
        status = "Right click is not available.";
      }
    }

    cc.LoaderScene.preload(
      [u.langRes("part2bg.png")],
      function () {
        const MyScene = cc.Scene.extend({
          onEnter: function () {
            this._super();
            cc.view.enableAutoFullScreen(true);

            winSize = cc.director.getWinSize();
            main = this;
            const mainLayer = new cc.LayerColor(cc.color(2, 4, 63, 255));
            mainLayer.setPosition(cc.p(0, 0));
            main.addChild(mainLayer);

            /**
             * Add add the layers and then remove them one by one as the user
             * progresses through the app.
             */
            initStartUI();
            initEventHandler();

            this._gameHideListener = cc.EventListener.create({
              event: cc.EventListener.CUSTOM,
              eventName: cc.game.EVENT_HIDE,
              callback: function () {
                cc.director.setDisplayStats(false);
              },
            });
            cc.eventManager.addListener(this._gameHideListener, 1);

            this._gameShowListener = cc.EventListener.create({
              event: cc.EventListener.CUSTOM,
              eventName: cc.game.EVENT_SHOW,
              callback: function () {
                cc.director.setDisplayStats(false);
              },
            });
            cc.eventManager.addListener(this._gameShowListener, 1);

            cc.eventManager.addListener(
              {
                event: cc.EventListener.MOUSE,
                onMouseMove: function (event) {
                  var target = event.getCurrentTarget();

                  function getMenuItems(node) {
                    if (node.children.length === 0) {
                      return [];
                    }

                    const menuItems = [];
                    for (const child of node.children) {
                      if (
                        child.visible === false ||
                        (child._className === "Menu" &&
                          child.isEnabled() === false)
                      ) {
                        continue;
                      }

                      if (
                        child._className === "MenuItem" &&
                        child.visible === true
                      ) {
                        menuItems.push(child);
                      } else {
                        menuItems.push(...getMenuItems(child));
                      }
                    }

                    return menuItems;
                  }

                  const menuItems = getMenuItems(target);
                  if (menuItems.length === 0) {
                    cc.$("#gameCanvas").style.cursor = "default";
                    return;
                  }

                  var locationInNode = target.convertToNodeSpace(
                    event.getLocation()
                  );

                  let isOverMenuItem = false;
                  for (const menuItem of menuItems) {
                    var menuItemRect = menuItem.rect();

                    if (cc.rectContainsPoint(menuItemRect, locationInNode)) {
                      isOverMenuItem = true;
                      break;
                    }
                  }

                  if (isOverMenuItem) {
                    cc.$("#gameCanvas").style.cursor = "pointer";
                  } else {
                    cc.$("#gameCanvas").style.cursor = "default";
                  }
                },
              },
              this
            );
          },
        });
        cc.director.runScene(new MyScene());
      },
      this
    );
  };

  cc.game.run("gameCanvas");

  // eslint-disable-next-line no-unused-vars
  function initStartUI() {
    const startLayer = new cc.LayerColor(cc.color(255, 255, 255, 255));
    main.addChild(startLayer, 2);

    u.setLayer(startLayer);

    u.addSprite(u.langRes("part2bg.png"));

    u.addMenuButton(u.langRes("start-button.png"), u.xcyo(1142), () => {
      main.removeChild(startLayer);
      initGlassesOrContactsUI();
    });

    u.addMenuButton(
      u.langRes("get-a-free-trial.png"),
      u.xcyo(1332),
      () => (window.location.href = freeTrialLink)
    );
  }

  function initGlassesOrContactsUI() {
    const glassesOrContactsLayer = new cc.LayerColor(
      cc.color(255, 255, 255, 255)
    );
    main.addChild(glassesOrContactsLayer, 2);

    u.setLayer(glassesOrContactsLayer);

    u.addSprite(u.langRes("background.png"));
    u.addSprite(u.langRes("glasses-or-contacts-background.png"), u.xcyo(248));

    u.addMenuButton(u.langRes("wearing-glasses.png"), u.xcyo(611), () => {
      main.removeChild(glassesOrContactsLayer);
      initGlassesGuideUI();
    });

    u.addMenuButton(u.langRes("wearing-contacts.png"), u.xcyo(1099), () => {
      main.removeChild(glassesOrContactsLayer);
      initContactsGuideUI();
    });
  }

  function addProgressIndicator(maxSteps) {
    const progressIndicators = [];
    const offResource = u.res("progress-indicator-off.png");
    const onResource = u.res("progress-indicator-on.png");

    function setProgressStep(currentStep) {
      progressIndicators.forEach((progressIndicator, progressIndicatorIdx) => {
        const resource =
          progressIndicatorIdx === currentStep - 1 ? onResource : offResource;

        progressIndicator.setTexture(resource);
      });
    }

    const offsetIncrement = 132;
    const startPos = winSize.width / 2 - (offsetIncrement * maxSteps) / 2;
    for (let i = 0; i < maxSteps; i++) {
      const resource = i === 0 ? onResource : offResource;
      const progressIndicator = u.addSprite(
        resource,
        u.xoyo(startPos + offsetIncrement * i, 1565)
      );
      progressIndicators.push(progressIndicator);
    }

    return setProgressStep;
  }

  function initGuideUI(
    guideSteps,
    guideResourcePrefix,
    finishedCallback,
    stepChangedCallback = () => {}
  ) {
    let guideStep = 1;

    const guideLayer = new cc.LayerColor(cc.color(2, 4, 63, 255));
    main.addChild(guideLayer);
    u.setLayer(guideLayer);

    function updateGuide() {
      guideText.setTexture(
        u.langRes(guideResourcePrefix + "-text" + guideStep + ".png")
      );

      guideImage.setTexture(
        u.langRes(guideResourcePrefix + "-image" + guideStep + ".png")
      );

      const nextButton = guideLayer.getChildByTag("next-button");
      const nextButtonVisible = guideStep < guideSteps;
      nextButton.setVisible(nextButtonVisible);

      const goButtonVisible = guideStep === guideSteps;
      goMenuButton.setVisible(goButtonVisible);
      setProgressStep(guideStep);

      stepChangedCallback(guideStep);
    }

    function nextGuideStep() {
      guideStep += 1;
      updateGuide();
    }

    function previousGuideStep() {
      guideStep -= 1;
      updateGuide();
    }

    function finishGuide() {
      main.removeChild(guideLayer);
      finishedCallback();
    }

    u.addSprite(u.langRes("background.png"));

    const setProgressStep = addProgressIndicator(guideSteps);

    const guideImage = cc.Sprite.create();
    guideImage.setPosition(cc.p(winSize.width / 2, winSize.height - 609));
    guideLayer.addChild(guideImage);

    const guideText = cc.Sprite.create();
    guideText.setPosition(cc.p(winSize.width / 2, winSize.height - 1260));
    guideLayer.addChild(guideText);

    u.addMenuButton(u.langRes("back-button.png"), u.xoyo(55, 1717), () => {
      if (guideStep === 1) {
        main.removeChild(guideLayer);
        initGlassesOrContactsUI();
      } else {
        previousGuideStep();
      }
    });

    u.addMenuButton(u.langRes("next-button.png"), u.xoyo(566, 1717), () =>
      nextGuideStep()
    ).setTag("next-button");

    const goMenuButton = u.addMenuButton(
      u.langRes("go-button.png"),
      u.xoyo(566, 1717),
      () => finishGuide()
    );
    goMenuButton.setVisible(false);

    updateGuide();
    return guideLayer;
  }

  function initGlassesGuideUI() {
    let glassesImage = null;

    const guideLayer = initGuideUI(
      4,
      "glasses-guide",
      () => initGlassesTestUI(),
      (newStep) => {
        if (newStep === 2 && glassesImage === null) {
          glassesImage = cc.Sprite.create(u.res("glasses.png"));
          glassesImage.setPosition(cc.p(705, winSize.height - 635));
          glassesImage.setAnchorPoint(0.8, 0.5);
          glassesImage.setVisible(false);
          guideLayer.addChild(glassesImage);
        }

        if (newStep === 2) {
          glassesImage.setVisible(false);
        }

        if (newStep === 3) {
          glassesImage.setVisible(true);
        }

        if (newStep === 4) {
          glassesImage.runAction(
            cc.sequence([
              cc.RotateTo.create(0.8, -30),
              cc.RotateTo.create(0.8, 0),
              cc.RotateTo.create(0.8, 30),
              cc.RotateTo.create(0.8, 0),
              cc.RotateTo.create(0.8, -30),
            ])
          );
        }
      }
    );
  }

  function initContactsGuideUI() {
    let handImage = null;

    const guideLayer = initGuideUI(
      3,
      "contacts-guide",
      () => initContactsTestUI(),
      (newStep) => {
        if (newStep === 3 && handImage === null) {
          handImage = cc.Sprite.create(u.res("hand.png"));
          handImage.setPosition(cc.p(705, winSize.height - 685));
          handImage.setVisible(false);
          guideLayer.addChild(handImage);

          handImage.runAction(
            cc.sequence([
              cc.FadeOut.create(0),
              cc.DelayTime.create(1),
              cc.callFunc(() => handImage.setVisible(true)),
              cc.Spawn.create(
                cc.FadeIn.create(0.5),
                cc.MoveTo.create(2, cc.p(805, winSize.height - 630))
              ),
            ])
          );
        }

        if (newStep === 2 && handImage !== null) {
          handImage.setVisible(false);
          guideLayer.removeChild(handImage);
          handImage = null;
        }
      }
    );
  }

  function initLoadingView(loadingScreenResource, callback) {
    const loadingLayer = new cc.LayerColor(cc.color(0, 0, 0, 200));
    loadingLayer.setPosition(cc.p(0, 0));
    main.addChild(loadingLayer, 5);

    const loadingText = cc.Sprite.create(loadingScreenResource);
    loadingText.setPosition(cc.p(winSize.width / 2, winSize.height / 2 + 90));
    loadingLayer.addChild(loadingText);

    const loading = cc.Sprite.create(u.res("loading-spinner.png"));
    loading.setPosition(cc.p(winSize.width / 2, winSize.height / 2 - 270));
    loadingLayer.addChild(loading);

    loading.runAction(
      cc.sequence([
        cc.RotateTo.create(3, 360 * 3),
        cc.callFunc(() => main.removeChild(loadingLayer), main),
        cc.callFunc(callback, main),
      ])
    );

    return loadingLayer;
  }

  function initContactsTestUI() {
    let testStep = 1;
    let touchListener = null;
    let results = { left: null, right: null };
    let currentEye = "right";
    let progressBubbles = [];

    const testLayer = new cc.LayerColor(cc.color(18, 42, 96));
    testLayer.setPosition(cc.p(0, 0));
    main.addChild(testLayer);
    u.setLayer(testLayer);

    function enableArrow() {
      function getSpeed(location) {
        let r = Math.atan2(
          location.x - targetPositionX,
          location.y - targetPositionY
        );
        return r * (180 / Math.PI) + 90;
      }

      function getArrowSpeed(touch, event) {
        const target = event.getCurrentTarget();
        const location = target.convertToNodeSpace(touch.getLocation());
        const speed = getSpeed(location);

        if (speed >= 0 && speed <= 177) {
          return speed;
        }

        return null;
      }

      touchListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        onTouchBegan: function () {
          return true;
        },
        onTouchMoved: function (touch, event) {
          const arrowSpeed = getArrowSpeed(touch, event);

          if (arrowSpeed !== null) {
            const arrowAngle = arrowSpeed - 90;
            arrow.setRotation(arrowAngle);
          }

          return true;
        },
        onTouchEnded: function () {},
      });

      cc.eventManager.addListener(touchListener, main);

      const animationStepTime = 0.4;
      arrow.runAction(
        cc.Repeat.create(
          cc.sequence([
            cc.RotateTo.create(animationStepTime, -20),
            cc.RotateTo.create(animationStepTime, 0),
            cc.RotateTo.create(animationStepTime, 20),
            cc.RotateTo.create(animationStepTime, 0),
          ]),
          1
        )
      );
    }

    function disableArrow() {
      cc.eventManager.removeListener(touchListener, main);
    }

    function updateProgress() {
      progressBubbles.forEach((progressBubble, progressBubbleIdx) => {
        const progressBubbleStep = progressBubbleIdx + 1;
        if (progressBubbleStep === testStep) {
          progressBubble.setTexture(u.res("progress-indicator-small-on.png"));
        } else {
          progressBubble.setTexture(u.res("progress-indicator-small-off.png"));
        }
      });
    }

    function nextStep(forceStep = null) {
      if (forceStep !== null) {
        testStep = forceStep;
      } else {
        testStep += 1;
      }

      const updateStep = () => {
        const stepResources = {
          1: 1,
          2: 2,
          3: 3,
          4: 4,
          5: 2,
          6: 3,
        };

        testText.setTexture(
          u.langRes("contacts-test-text" + stepResources[testStep] + ".png")
        );
        updateProgress();
      };

      // Step 1: "Do you see any lines..."
      // Step 2: "Touch and move..."
      // Step 3: "Do the lines on 1 of the blocks..."
      // Step 4: left eye "Do you see any lines..."
      // Step 5: left eye "Touch and move..."
      // Step 6: left eye "Do the lines on 1 of the blocks..."

      if (testStep === 2 || testStep === 5) {
        enableArrow();
        yesButton.setVisible(false);
        noButton.setVisible(false);
        nextMenu.setVisible(true);
        updateStep();
      }

      if (testStep === 3 || testStep === 6) {
        disableArrow();
        yesButton.setVisible(true);
        noButton.setVisible(true);
        nextMenu.setVisible(false);
        testBox.setVisible(true);
        updateStep();
      }

      if (testStep === 4) {
        currentEye = "left";

        yesButton.setEnabled(false);
        noButton.setEnabled(false);

        initLoadingView(u.langRes("loading-text-next-eye.png"), () => {
          yesButton.setEnabled(true);
          noButton.setEnabled(true);
          arrow.setRotation(0);
          testBox.setVisible(false);
          updateStep();
        });
      }

      if (testStep === 7) {
        yesButton.setEnabled(false);
        noButton.setEnabled(false);
        initLoadingView(u.langRes("loading-text-complete.png"), () => {
          testBox.setVisible(false);
          initResult(results["left"], results["right"]);
        });
      }
    }

    u.addSprite(u.res("contacts-test-background.png"));

    const arrow = u.addSprite(u.res("arrow.png"), u.xcyo(1186));
    arrow.setAnchorPoint(0.5, 0);

    const testBox = cc.Sprite.create(u.res("box_n.png"));
    testBox.setPosition(cc.p(5, -40));
    testBox.setVisible(false);
    arrow.addChild(testBox);

    targetPositionX = arrow.getPosition().x;
    targetPositionY = arrow.getPosition().y;

    const testText = u.addSprite(
      u.langRes("contacts-test-text1.png"),
      u.xcyo(1305)
    );

    const yesButton = u.addMenuButton(
      u.langRes("yes-button.png"),
      u.xoyo(51, 1716),
      () => {
        if (testStep === 1 || testStep === 4) {
          results[currentEye] = "astigmatism";
        }

        if (testStep === 3 || testStep === 6) {
          results[currentEye] = "high-astigmatism";
        }
        nextStep();
      }
    );

    const noButton = u.addMenuButton(
      u.langRes("no-button.png"),
      u.xoyo(552, 1716),
      () => {
        if (testStep === 1) {
          results[currentEye] = "no-astigmatism";
          nextStep(4);
          return;
        }

        if (testStep === 4) {
          results[currentEye] = "no-astigmatism";
          nextStep(7);
          return;
        }

        // Do not overwrite "astigmatism" result, just go to the next step.
        nextStep();
      }
    );

    const nextMenu = u.addMenuButton(
      u.langRes("next-button-wide.png"),
      u.xcyo(1716),
      () => nextStep()
    );
    nextMenu.setTag("next-button");
    nextMenu.setVisible(false);

    const numSteps = 6;
    const offsetIncrement = 88;
    const startPos = winSize.width / 2 - ((numSteps - 1) / 2) * offsetIncrement;
    for (let i = 0; i < numSteps; i++) {
      const onOrOff = i === 0 ? "on" : "off";

      const progressBubble = cc.Sprite.create(
        u.res(`progress-indicator-small-${onOrOff}.png`)
      );
      progressBubble.setPosition(
        cc.p(startPos + i * offsetIncrement, winSize.height - 1644)
      );
      testLayer.addChild(progressBubble);
      progressBubbles.push(progressBubble);
    }
  }

  function initGlassesTestUI() {
    let testStep = 1;
    let results = { left: null, right: null };
    let currentEye = "right";
    let progressIndicators = [];

    const testLayer = new cc.LayerColor(cc.color(18, 42, 96));
    testLayer.setPosition(cc.p(0, 0));
    main.addChild(testLayer);

    u.setLayer(testLayer);
    u.addSprite(u.langRes("glasses-test-background.png"));

    const flashSequence = (callback = () => {}) => {
      const cameraButton = u.addSprite(
        u.res("camera-button.png"),
        u.xoyo(436, 1023)
      );
      const flashLayer = new cc.LayerColor(cc.color(255, 255, 255));
      flashLayer.setPosition(cc.p(0, 0));
      testLayer.addChild(flashLayer);
      lightPhoto.setVisible(true);

      flashLayer.runAction(
        cc.sequence([
          cc.DelayTime.create(0.1),
          cc.callFunc(() => {
            cameraButton.setVisible(true);
          }),
          cc.FadeOut.create(1.0),
          cc.callFunc(() => flashLayer.setVisible(false)),
          cc.FadeIn.create(0),
          cc.DelayTime.create(0.2),
          cc.callFunc(callback),
        ])
      );
    };

    const nextStep = () => {
      testStep += 1;

      // Step 1: [Right eye] Remove your glasses and hold them... (next)
      // Step 2: [Right eye] While looking at the cross ... change shape? (yes, no)
      // Step 3: [Right eye] Now repeat while looking at the cross through the left lens (next)
      // Loading...
      // Step 4: [Left eye]  While looking at the cross ... change shape? (yes, no)
      // Step 5: (finished)

      const loadNextStep = () => {
        testText.setTexture(u.langRes(`glasses-test-text${testStep}.png`));

        progressIndicators.forEach(
          (progressIndicator, progressIndicatorIdx) => {
            const progressIndicatorStep = progressIndicatorIdx + 1;
            if (progressIndicatorStep === testStep) {
              progressIndicator.setTexture(
                u.res("progress-indicator-small-on.png")
              );
            } else {
              progressIndicator.setTexture(
                u.res("progress-indicator-small-off.png")
              );
            }
          }
        );
      };

      if (testStep === 2) {
        yesButton.setVisible(true);
        noButton.setVisible(true);
        goButton.setVisible(false);
        nextButton.setVisible(false);
        loadNextStep();
      }

      if (testStep === 3) {
        yesButton.setEnabled(false);
        noButton.setEnabled(false);

        initLoadingView(u.langRes("loading-text-close-right-eye.png"), () => {
          yesButton.setVisible(false);
          noButton.setVisible(false);
          goButton.setVisible(false);
          nextButton.setVisible(true);
          currentEye = "left";
          loadNextStep();
        });
      }

      if (testStep === 4) {
        yesButton.setEnabled(true);
        noButton.setEnabled(true);

        yesButton.setVisible(true);
        noButton.setVisible(true);
        goButton.setVisible(false);
        nextButton.setVisible(false);
        loadNextStep();
      }

      if (testStep === 5) {
        yesButton.setEnabled(false);
        noButton.setEnabled(false);

        flashSequence(() => {
          const loadingLayer = initLoadingView(
            u.langRes("loading-text-complete.png"),
            () => {
              main.removeChild(loadingLayer);
              initResult(results["left"], results["right"]);
            }
          );
        });
      }
    };

    const testText = u.addSprite(
      u.langRes("glasses-test-text1.png"),
      u.xcyo(1305)
    );

    const goButton = u.addMenuButton(
      u.langRes("go-button-wide.png"),
      u.xoyo(55, 1717),
      nextStep
    );

    goButton.setEnabled(false);

    const yesButton = u.addMenuButton(
      u.langRes("yes-button.png"),
      u.xoyo(55, 1717),
      () => {
        results[currentEye] = "astigmatism";
        nextStep();
      }
    );
    yesButton.setVisible(false);

    const noButton = u.addMenuButton(
      u.langRes("no-button.png"),
      u.xoyo(566, 1717),
      () => {
        results[currentEye] = "no-astigmatism";
        nextStep();
      }
    );
    noButton.setVisible(false);

    const nextButton = u.addMenuButton(
      u.langRes("next-button-wide.png"),
      u.xoyo(55, 1717),
      nextStep
    );
    nextButton.setVisible(false);

    const lightPhoto = u.addSprite(u.res("light-photo.png"), u.xoyo(76, 88));
    lightPhoto.setVisible(false);

    const numSteps = 4;
    const offsetIncrement = 88;
    const startPos = winSize.width / 2 - ((numSteps - 1) / 2) * offsetIncrement;
    for (let i = 0; i < numSteps; i++) {
      const onOrOff = i === testStep - 1 ? "on" : "off";

      const progressIndicator = cc.Sprite.create(
        u.res(`progress-indicator-small-${onOrOff}.png`)
      );
      progressIndicator.setPosition(
        cc.p(startPos + i * offsetIncrement, winSize.height - 1644)
      );
      testLayer.addChild(progressIndicator);
      progressIndicators.push(progressIndicator);
    }

    initLoadingView(u.langRes("loading-text-close-left-eye.png"), () => {
      goButton.setEnabled(true);
    });
  }

  function initResult(leftResult, rightResult) {
    //console.log(`leftResult`, leftResult);
    //console.log(`rightResult`, rightResult);

    const resultLayer = new cc.LayerColor(cc.color(2, 4, 63, 255));
    resultLayer.setPosition(cc.p(0, 0));
    main.addChild(resultLayer, 2);

    u.setLayer(resultLayer);

    const background = cc.Sprite.create(u.langRes("background.png"));
    background.setPosition(cc.p(winSize.width / 2, winSize.height / 2));
    resultLayer.addChild(background);

    const resultBackground = cc.Sprite.create(u.res("result-background.png"));
    resultBackground.setPosition(
      cc.p(winSize.width / 2, winSize.height - 1058)
    );
    resultLayer.addChild(resultBackground);

    u.addMenuButton(
      u.langRes("download-free-trial-voucher.png"),
      u.xcyo(1246),
      () => (window.location.href = freeTrialLink)
    );

    u.addMenuButton(
      u.langRes("learn-more-about-astigmatism.png"),
      u.xcyo(1424),
      () => (window.location.href = learnMoreLink)
    );

    u.addMenuButton(
      u.langRes("terms-and-conditions.png"),
      u.xcyo(1617),
      () => (window.location.href = tsAndCsLink)
    );

    const resultImages = [];
    resultImages["no-astigmatism"] = [];
    resultImages["no-astigmatism"]["no-astigmatism"] = "no-astigmatism";
    resultImages["no-astigmatism"]["astigmatism"] = "astigmatism-right";
    resultImages["no-astigmatism"]["high-astigmatism"] = "astigmatism-right";

    resultImages["astigmatism"] = [];
    resultImages["astigmatism"]["no-astigmatism"] = "astigmatism-left";
    resultImages["astigmatism"]["astigmatism"] = "astigmatism-both";
    resultImages["astigmatism"]["high-astigmatism"] = "astigmatism-both";

    resultImages["high-astigmatism"] = [];
    resultImages["high-astigmatism"]["no-astigmatism"] = "astigmatism-left";
    resultImages["high-astigmatism"]["astigmatism"] = "astigmatism-both";
    resultImages["high-astigmatism"]["high-astigmatism"] = "astigmatism-both";

    const resultImage = resultImages[leftResult][rightResult];
    const resultScreen = cc.Sprite.create(
      u.langRes("result-" + resultImage + ".png")
    );
    resultScreen.setPosition(cc.p(winSize.width / 2, winSize.height - 804));
    resultLayer.addChild(resultScreen);
  }
};
