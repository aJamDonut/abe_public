(function () {
  _BLUEPRINTS.COMPONENTS = {};
  _BLUEPRINTS.COMPONENTS.testcircleshadow = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.w = options.w || 100;
      options.h = options.h || 100;
      const pane = new UIContainer();
      function translateHour(value) {
        const minValue = 0;
        const maxValue = 24;
        const translatedMinValue = -1;
        const translatedMaxValue = 1;
        const range = maxValue - minValue;
        const translatedRange = translatedMaxValue - translatedMinValue;
        const translatedValue = (value - minValue) / range * translatedRange + translatedMinValue;
        return translatedValue;
      }
      const circle = new PIXI.Graphics();
      circle.beginFill(options.fill || 0xff0000);
      circle.drawCircle(options.w / 2, options.h / 2, options.w / 2);
      circle.endFill();
      pane.addChild(circle);
      const circle1 = new PIXI.Graphics();
      circle1.beginFill(options.fill || 0x00ff00);
      circle1.drawCircle(options.w / 2, options.h / 2, options.w / 2);
      circle1.endFill();
      pane.addChild(circle1);
      const matrix = new PIXI.Matrix();
      matrix.a = 1;
      matrix.b = 1;
      matrix.c = 1;
      matrix.d = 0;
      matrix.tx = -100;
      matrix.ty = 0;
      circle.transform.setFromMatrix(matrix);
      let hour = 0;
      let ticker = new TickerContainer(matrix, m => {
        let start = translateHour(hour);
        hour++;
        if (hour >= 23) {
          hour = 0;
        }
        let txN = -start;
        const matrix = new PIXI.Matrix();
        matrix.a = start;
        matrix.b = 1;
        matrix.c = 1;
        matrix.d = 0;
        matrix.tx = txN * 100;
        matrix.ty = 0;
        circle.transform.setFromMatrix(matrix);
        return true;
      }, 0.5);
      pane.addChild(ticker);
      return pane;
    },
    "parent": 'component_misc',
    "name": 'circleshadow'
  };
  _BLUEPRINTS.COMPONENTS.showAllParticles = {
    "getElement": function (options) {
      var pane = new UIContainer();
      var particle = new Particles('trail_1');
      pane.x = 20;
      pane.y = 20;
      pane.addChild(particle);
      particle.playForever();
      return pane;
    },
    "parent": 'component_stages',
    "name": 'Show All Particles'
  };
  _BLUEPRINTS.COMPONENTS.frontMenu = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let container = new UIContainer();
      var pane = new UIContainer();
      container.addChild(pane);
      game.cover = new Sprite('sprite_frontmenu_bg');
      if (options.close) {
        game.cover = new UIPane();
      }
      game.cover.alpha = 0.5;
      game.cover.isInteractive();
      pane.addChild(game.cover);
      let cooly = game.render.component('hud_makes_cool', 'cooly');
      game.cover.cooly = cooly;
      pane.addChild(cooly);
      let logo = new Sprite('sprite_logo');
      logo.y = 15;
      logo.setScale(0.75);
      game.cover.logo = logo;
      pane.addChild(logo);
      let ticker = new ABE.TickerContainer(game.cover, () => {
        game.cover.height = game.ui._VIEWPORT_BOTTOM;
        game.cover.width = game.ui._VIEWPORT_RIGHT;
        if (game.cover.logo && typeof game.cover.logo.x !== "undefined") {
          game.cover.logo.x = game.ui._VIEWPORT_RIGHT - game.cover.logo.width - 15;
        }
        if (options.close) {
          game.cover.alpha = 0.9;
        }
      }, 0.5);
      pane.addChild(ticker);
      let template = game.render.componentRaw('hud_button', {
        name: 'Save Game',
        w: 210,
        corner: true
      });
      let x = 150;
      if (options.close) {
        x = game.ui._VIEWPORT_RIGHT / 2 - template.width / 2;
      }
      var y = 150;
      var pad = 50;
      var btnType = 'hud_button';
      if (options.close) {
        var btn = game.render.componentRaw(btnType, {
          name: 'Save Game',
          w: 210,
          corner: true
        });
        pane.addChild(btn);
        btn.x = x;
        btn.y = y;
        y += pad;
        btn.isInteractive();
        btn.on('pointerup', function () {
          game.index.getIndex('open_components')['frontMenu'].destroy();
          game.saves.requestSaveWithName();
        });
      }
      if (!options.close) {
        var btn = game.render.componentRaw(btnType, {
          name: 'New Game',
          w: 210,
          corner: true
        });
        pane.addChild(btn);
        btn.x = x;
        btn.y = y;
        y += pad;
        btn.pane = pane;
        btn.isInteractive();
        btn.on('pointerup', function () {
          let ui = game.render.componentRaw('hud_basic_gamestart', {
            title: 'New Game',
            type: 'new',
            parent: this.pane
          }, 'hud_load');
          this.pane.addChild(ui);
          ui.x = 100;
          ui.y = 100;
        });
      }
      var btn = game.render.componentRaw(btnType, {
        name: 'Load',
        w: 210,
        corner: true
      });
      pane.addChild(btn);
      btn.x = x;
      btn.y = y;
      y += pad;
      btn.pane = pane;
      btn.isInteractive();
      btn.on('pointerup', function () {
        let ui = game.render.componentRaw('hud_load', {
          title: 'Load Game',
          type: 'load'
        }, 'hud_load');
        this.pane.addChild(ui);
        ui.x = 100;
        ui.y = 100;
      });
      var btn = game.render.componentRaw(btnType, {
        name: 'Settings',
        w: 210,
        corner: true
      });
      pane.addChild(btn);
      btn.x = x;
      btn.y = y;
      y += pad;
      btn.pane = pane;
      btn.isInteractive();
      btn.on('pointerup', function () {
        game.ui.open('panel_settings', {
          x: 50,
          y: 50
        });
      });
      if (!options.close) {
        var btn = game.render.componentRaw(btnType, {
          name: 'Mods',
          w: 210,
          corner: true
        });
        pane.addChild(btn);
        btn.x = x;
        btn.y = y;
        y += pad;
        btn.pane = pane;
        btn.isInteractive();
        btn.on('pointerup', function () {
          let ui = game.render.componentRaw('hud_mods', {
            title: 'Load Game',
            type: 'load'
          }, 'hud_mods');
          this.pane.addChild(ui);
          ui.x = 100;
          ui.y = 100;
        });
        var btn = game.render.componentRaw(btnType, {
          name: 'Level editor',
          w: 210,
          corner: true
        });
        pane.addChild(btn);
        btn.pane = pane;
        btn.x = x;
        btn.y = y;
        y += pad;
        btn.isInteractive();
        btn.on('pointerup', function () {
          window.location.href = "?noAudio=true&test=true&type=scene&unit=lvleditor&level=dev/test1&x=67&y=88&tt=y&map=live";
        });
      }
      var btn = game.render.componentRaw(btnType, {
        name: 'Exit',
        w: 210,
        corner: true
      });
      pane.addChild(btn);
      btn.x = x;
      btn.pane = pane;
      btn.y = y;
      y += pad;
      btn.isInteractive();
      btn.on('pointerup', function () {
        window.close();
      });
      if (options.close) {
        var btn = game.render.componentRaw(btnType, {
          name: 'Close Menu',
          w: 210,
          corner: true
        });
        pane.addChild(btn);
        btn.x = x;
        btn.pane = pane;
        btn.y = y;
        y += pad;
        btn.isInteractive();
        btn.on('pointerup', function () {
          game.index.getIndex('open_components')['frontMenu'].destroy();
        });
      }
      return container;
    },
    "parent": 'component_stages',
    "name": 'Front Menu'
  };
  _BLUEPRINTS.COMPONENTS.hud_died = {
    "options": 'tip',
    "getElement": function (options) {
      game.cameraFollow = false;
      game.p = {
        x: 0,
        y: 0
      };
      var pane = new UIContainer();
      game.cover = new UIPane({
        fullscreen: false,
        fill: '0x000000',
        padding: 0,
        x: 0,
        y: 0,
        w: game.ui._VIEWPORT_RIGHT,
        h: game.ui._VIEWPORT_BOTTOM
      });
      game.cover.alpha = 0;
      pane.addChild(game.cover);
      game.setTicker("cover", () => {
        game.cover.height = game.ui._VIEWPORT_BOTTOM;
        game.cover.width = game.ui._VIEWPORT_RIGHT;
        game.cover.alpha += 0.01;
      });
      if (!options) {
        options = {};
      }
      if (!options.tip) {
        options.tip = "Your entire squad has been wiped out!`n`nRemember: save often, plan ahead and most important, bring backup!";
      }
      var x = 150;
      var y = 150;
      var pad = 50;
      var btnType = 'hud_button';
      var text = game.render.text('Uh-Oh! YOU WIPED!!', 'HUDCASH');
      pane.addChild(text);
      text.x = 10;
      text.y = 10;
      var text = game.render.text(options.tip, 'item-desc');
      pane.addChild(text);
      text.x = 10;
      text.y = 50;
      var btn = game.render.componentRaw(btnType, {
        name: 'Load'
      });
      pane.addChild(btn);
      btn.x = x;
      btn.alpha = 0.5;
      btn.y = y;
      y += pad;
      btn.isInteractive();
      btn.on('pointerup', function () {
        let ui = game.render.componentRaw('hud_load', {
          title: 'Load Game',
          type: 'load'
        }, 'hud_load');
        game.render.aboveAll.addChild(ui);
        ui.x = 100;
        ui.y = 100;
      });
      return pane;
    },
    "parent": 'component_stages',
    "name": 'Hud Died'
  };
  _BLUEPRINTS.COMPONENTS.hud_main = {
    "getElement": function () {
      let totalHeight = 350;
      let mainHud = new UIContainer();
      let shootTypes = game.render.componentRaw('hud_shoot_types');
      mainHud.addChild(shootTypes);
      shootTypes.y = 5;
      let runTypes = game.render.componentRaw('hud_run_types');
      mainHud.addChild(runTypes);
      runTypes.y += 30 + 35;
      let tmpCharCard2 = game.render.componentRaw('hud_player_card', {
        player: true
      });
      let charCard = new PersistentTickerContainer({}, function (caller) {
        if (this.card && game.p.id && this.lastP !== game.p.id) {
          this.lastP = game.p.id;
          this.card.destroy();
          this.card = false;
        }
        if (!this.card) {
          this.lastP = game.p.id;
          this.card = game.render.componentRaw('hud_player_card', {
            player: true
          });
          this.addChild(this.card);
        }
      }, 0.1);
      mainHud.addChild(charCard);
      charCard.y += 10 + 32 + 35 + 35 + 12;
      charCard.x = 0;
      let charCard2 = new PersistentTickerContainer({}, function (caller) {
        if (this.card && game.watching && game.watching.id !== this.lastWatchId) {
          this.lastWatchId = false;
          this.card.destroy();
          this.card = false;
        }
        if (!this.card) {
          if (game.watching && game.watching.id) {
            this.lastWatchId = game.watching.id;
          }
          if (!game.watching) {
            return;
          }
          this.card = game.render.componentRaw('hud_player_card');
          this.addChild(this.card);
        }
      }, 0.1);
      charCard2.y += 10 + 32 + 35 + 35 + 12;
      mainHud.addChild(charCard2);
      mainHud.y = game.ui._VIEWPORT_BOTTOM - totalHeight;
      game.uiToggles = new UIContainer();
      game.render.aboveAll.addChild(game.uiToggles);
      var toggles = game.render.component('player_hud_toggles');
      toggles.x = 200;
      toggles.y = 45;
      game.uiToggles.addChild(toggles);
      var toggles = game.render.component('player_hud_pawns');
      toggles.x = 25;
      toggles.y = 45;
      game.uiToggles.addChild(toggles);
      var miniMap = game.render.component('hud_mini_map');
      miniMap.y = 25;
      miniMap.x = game.ui._VIEWPORT_RIGHT - miniMap.width - 25;
      game.render.aboveAll.addChild(miniMap);
      let tutSteps = new TickerContainer({}, function (caller) {
        if (game.settings.showTut) {
          this.addChild(game.render.component('hud_tutsteps'));
        }
      }, 5);
      tutSteps.y = 50;
      game.render.aboveAll.addChild(tutSteps);
      const radioScale = 0.5;
      const radioContainer = new UIContainer();
      const radioOff = new Sprite('sprite_radio_off');
      radioOff.scale.set(radioScale);
      radioContainer.radioOff = radioOff;
      radioContainer.addChild(radioOff);
      const radioOn = new Sprite('sprite_radio_on');
      radioOn.scale.set(radioScale);
      radioOn.alpha = 0;
      radioContainer.radioOn = radioOn;
      radioContainer.addChild(radioOn);
      radioContainer.isInteractive();
      radioContainer.on('pointerup', function () {
        var radio = game.render.component('hud_radio', {
          tabIndex: 1
        }, 'hud_radio');
        radio.y = game.ui._VIEWPORT_BOTTOM / 2 - radio.height / 2;
        radio.x = game.ui._VIEWPORT_RIGHT / 2 - radio.width / 2;
        game.render.aboveAll.addChild(radio);
      });
      radioContainer.on('pointerover', function () {
        this.radioOn.alpha = 1;
      });
      radioContainer.on('pointerout', function () {
        if (!game.audio.albumPlaying || !game.audio.albumPlaying.playing()) {
          this.radioOn.alpha = 0;
        }
      });
      radioContainer.y = miniMap.y + 450;
      radioContainer.x = game.ui._VIEWPORT_RIGHT - radioContainer.width - 25;
      game.radio = radioContainer;
      game.render.aboveAll.addChild(radioContainer);
      game.setTicker('position_hud', () => {
        mainHud.y = game.ui._VIEWPORT_BOTTOM - totalHeight;
        charCard2.x = game.ui._VIEWPORT_RIGHT - tmpCharCard2.width;
        tutSteps.x = game.ui._VIEWPORT_RIGHT - 230;
        tutSteps.y = 250;
      });
      return mainHud;
    },
    "parent": 'component_stages',
    "name": 'HUD Main'
  };
  _BLUEPRINTS.COMPONENTS.stages_default_stage = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      var text = options.text || "LOADED WITHOUT STAGE";
      var w = 400;
      var h = 150;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Notification',
        moveable: true,
        showX: true,
        w: w,
        h: h
      });
      var text = game.render.text(text, 'longerwhitedesc');
      text.x = pane.width / 2;
      text.y = pane.height / 2;
      text.anchor.set(0.55, 1);
      pane.addChild(text);
      return pane;
    },
    "parent": 'component_stages',
    "name": 'Default Stage'
  };
  _BLUEPRINTS.COMPONENTS.component_loadfile = {
    "getElement": function () {
      game.slot = game.urlVar('load') || game.slot;
      game.fs.setFolder(game.slot, true);
      let hasName = game.grid.saveGames[game.slot] && game.grid.saveGames[game.slot].name;
      game.niceName = hasName ? game.grid.saveGames[game.slot].name : 'Dead Desert';
      if (game.testMode) {
        return new UIContainer();
      }
      game.grid.reset();
      game.session = new GameSession(game);
      game.render.viewport.x = game.session.viewport.x;
      game.render.viewport.y = game.session.viewport.y;
      game.grid.loadFirstChunk(Math.ceil(game.session.viewport.px / 64 / 10), Math.ceil(game.session.viewport.py / 64 / 10));
      game.ui.mainUI();
    },
    "parent": 'component_stages',
    "name": 'CLEAN ME - LoadFile'
  };
  _BLUEPRINTS.COMPONENTS.hud_stats = {
    "getElement": function () {
      let onDown = function (stat, container, item, desc) {
        item.container = container;
        item.isInteractive();
        item.on('pointerover', function () {
          this.container.text = desc;
          this.container.stat = stat;
        });
        return item;
      };
      let container = game.render.componentRaw('drawBoxPane', {
        title: game.p.data.name + ' Stats',
        moveable: true,
        w: 900,
        h: 420,
        showX: true
      });
      this.watch = game.p;
      let pane = new UIContainer();
      container.addChild(pane);
      pane.x = 20;
      pane.y = 20;
      let list = [onDown('savage', this, game.render.component('drawLabel', {
        name: 'Savage',
        value: this.watch.data.levels.savage.level
      }), 'How experienced you are overall, more savage means more `nrespect and unique options in the game. `n`nLevel up savage with all actions'), onDown('melee', this, game.render.component('drawLabel', {
        y: 1,
        name: 'Melee',
        value: this.watch.data.levels.melee.level
      }), 'How much damage you do with melee attacks `n`nLevel up melee by killing with fists or melee weapons'), onDown('ranged', this, game.render.component('drawLabel', {
        y: 2,
        name: 'Range',
        value: this.watch.data.levels.ranged.level
      }), 'How much accuracy you have with ranged weapons `n`nLevel up by using ranged weapons'), onDown('toughness', this, game.render.component('drawLabel', {
        y: 3,
        name: 'Toughness',
        value: this.watch.data.levels.toughness.level
      }), 'How much damage resistance you have `n`nLevel up by taking damage and healing')];
      let column = game.render.componentRaw('pager', {
        items: list,
        itemsPerPage: 4
      });
      pane.addChild(column);
      let list2 = [onDown('strength', this, game.render.component('drawLabel', {
        y: 1,
        name: 'Strength',
        value: this.watch.data.levels.strength.level
      }), 'Increases carrying weight as well as the ability to destroy `ncertain items`n`nLevel up by travelling with high weight'), onDown('athletics', this, game.render.component('drawLabel', {
        y: 2,
        name: 'Athletics',
        value: this.watch.data.levels.athletics.level
      }), 'Increases running speed and chance to dodge melee attacks `n`nLevel up by running with low weight'), onDown('crafting', this, game.render.component('drawLabel', {
        name: 'Crafting',
        value: this.watch.data.levels.crafting.level
      }), 'Increases the level of items you can craft also the`nresources gained from grinding.`n`nLevel up by crafting and grinding items'), onDown('intelligence', this, game.render.component('drawLabel', {
        y: 3,
        name: 'Intelligence',
        value: this.watch.data.levels.intelligence.level
      }), 'Effects the speed of hacking and increases speech effectiveness`n`nLevel by hacking and talking')];
      let column2 = game.render.componentRaw('pager', {
        items: list2,
        itemsPerPage: 4
      });
      pane.addChild(column2);
      column2.x += column.width + 10;
      let leftPane = new UIPane({
        fill: '0x212121',
        w: column2.x + column2.width,
        h: 160
      });
      pane.addChild(leftPane);
      leftPane.y = column.height - 35;
      this.text = 'Hover over stats to get more information';
      this.leftText = false;
      let leftText = new TickerContainer(this, function (pass) {
        let stat = pass.stat;
        let extra = "";
        if (stat) {
          let xpStart = pass.watch.data.levels[stat].xp - pass.watch.data.levels[stat].lastXP;
          let nextXP = pass.watch.data.levels[stat].nextXP - pass.watch.data.levels[stat].lastXP;
          let onePercent = nextXP / 100;
          let percent = Math.ceil(xpStart / onePercent);
          extra = "`n`nProgress: " + Math.ceil(xpStart) + " / " + nextXP + " XP";
          let progressBar = game.render.componentRaw('statBar', {
            value: xpStart,
            maxValue: nextXP,
            fill: 0x009900,
            w: 510,
            name: percent + "%"
          });
          this.addChild(progressBar);
          progressBar.y = 170;
        }
        let leftText = game.render.text(pass.text + extra, 'item-desc');
        this.addChild(leftText);
        leftText.x = 10;
        leftText.y = 10;
      }, 0.1);
      pane.addChild(leftText);
      leftText.y = 135;
      let rightPane = new UIPane({
        fill: '0x212121',
        w: 340,
        h: 202
      });
      pane.addChild(rightPane);
      rightPane.y = 0;
      rightPane.x = leftPane.width + 12.5;
      let rightText = game.render.text('Rating: Petty Clone`n`nDays Survived: 10`nClones Killed: 124`nClones Converted: 2`nCodecs Read: 2/25`nItems Crafted: 25`nItems Grinded: 2`nSpeech Checks Passed: 1`nHacks completed: 12', 'item-desc');
      pane.addChild(rightText);
      rightText.x = 530;
      rightText.y = 10;
      return container;
    },
    "parent": 'component_huds',
    "name": 'Hud Stats'
  };
  _BLUEPRINTS.COMPONENTS.hud_recycler = {
    "options": 'recycler',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      var recycler = options.recycler;
      if (!recycler) {
        recycler = {
          id: 'test',
          recycle: function () {}
        };
        recycler.inventory = new Inventory('main', 10, 4, recycler);
      }
      var w = 340;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Recycler',
        moveable: true,
        showX: true,
        w: w,
        h: 480
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 10;
      recycler.inventory.getInventoryGrid();
      recycler.inventory.gridComponent.x -= 22;
      recycler.inventory.gridComponent.y += 20;
      container.addChild(recycler.inventory.gridComponent);
      var btnRecycle = new TickerContainer(recycler, function (recycler) {
        if (this.btn) {
          this.btn.destroy();
        }
        var btnRecycle = game.render.component('hud_button', {
          name: 'Recycle'
        });
        this.btn = btnRecycle;
        this.addChild(btnRecycle);
        btnRecycle.x = w / 2 - btnRecycle.width / 2 - 30;
        btnRecycle.y = recycler.inventory.gridComponent.y + recycler.inventory.gridComponent.height + 30;
        btnRecycle.isInteractive();
        btnRecycle.recycler = recycler;
        if (recycler.recycling) {
          btnRecycle.alpha = 0.5;
        } else {
          btnRecycle.on('pointerup', function () {
            this.recycler.recycle();
          });
        }
      }, 0.1);
      container.addChild(btnRecycle);
      var resourceList = game.render.component('component_playerresources');
      container.addChild(resourceList);
      resourceList.x = 15;
      resourceList.y = container.y + container.height + 100;
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Hud Recycler'
  };
  _BLUEPRINTS.COMPONENTS.hud_crafting = {
    "options": 'crafter',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let crafter = options.crafter;
      if (!crafter) {
        if (game.p && game.p.craft) {
          crafter = game.p;
        }
        crafter = {
          inventory: {},
          craft: function () {}
        };
      }
      if (!crafter.inventory.craft) {
        crafter.inventory.craft = new Inventory('main', 4, 4, crafter);
      }
      var knownRecipes = game.session.getUnlockedRecipes('player') || ['recipe_pers_worlditem_campfire'];
      var allRecipes = {};
      allRecipes = game.session.getUnlockedRecipesList('player');
      var w = 650;
      var h = 455;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Crafting',
        moveable: true,
        showX: true,
        w: w,
        h: h
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 30;
      var listX = -30;
      crafter.knownRecipes = knownRecipes;
      crafter.allRecipes = allRecipes;
      crafter.genRecipe = function (crafter, recipeName, recipe) {
        var component = game.render.component('component_blueprint', {
          name: recipeName,
          recipe: _BLUEPRINTS.RECIPES['recipe_' + recipeName]
        });
        component.isInteractive();
        component.recipe = recipe;
        component.recipeName = recipeName;
        component.crafter = crafter;
        let recipeItem = _BLUEPRINTS.RECIPES['recipe_' + recipeName];
        let item = new InventoryItem(recipeName);
        const itemDescriber = {
          showResearchCost: false,
          showCraftingCost: true,
          codename: item.codename,
          amount: recipeItem.amount,
          require: recipeItem.require,
          readName: item.name,
          data: item.data,
          meta: item.meta
        };
        game.inventories.attachHoverFunctions(component, itemDescriber, true);
        component.on('pointerup', function () {
          if (this.crafter.selected == this.recipeName) {
            this.crafter.selected = false;
            return;
          }
          this.crafter.selected = this.recipeName;
          this.crafter.recipe = _BLUEPRINTS.RECIPES['recipe_' + recipeName];
        });
        if (crafter.selected !== recipeName) {
          component.alpha = 0.5;
        }
        return component;
      };
      var column = new TickerContainer(crafter, function (crafter) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (let i = 0; i < crafter.knownRecipes.length; i++) {
          list.push(crafter.genRecipe(crafter, crafter.knownRecipes[i], crafter.allRecipes[crafter.knownRecipes[i]]));
        }
        this.pane = new UIPane({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 350,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          template: 'pagergrid',
          ticks: true,
          page: page,
          width: 340,
          items: list,
          itemsPerPage: 4 * 4
        });
        pager.x = -5;
        pager.y = 10;
        this.pager = pager;
        this.pane.addChild(pager);
        this.addChild(this.pane);
      }, function () {
        let crafter = this.ref;
        let refresh = this.lastRecipe === crafter.recipe;
        this.lastRecipe = crafter.recipe;
        return refresh;
      });
      column.lastRecipe = 'whatever';
      container.addChild(column);
      let btnCraft = new TickerContainer(crafter, function (crafter) {
        let alpha = 1;
        if (!crafter.selected || crafter.selected.length == 0) {
          alpha = 0.25;
        }
        let title = 'Craft item';
        if (crafter.isCrafting) {
          title = 'Crafting...';
          alpha = 0.5;
        }
        if (crafter.inventory.craft.usedSlots() > 0) {
          title = 'Please remove item';
          alpha = 0.5;
        }
        let btnCraft = game.render.component('hud_button', {
          name: title,
          w: 250
        });
        btnCraft.alpha = alpha;
        this.addChild(btnCraft);
        btnCraft.crafter = crafter;
        if (alpha == 0.5) {
          return;
        }
        if (alpha == 1) {
          btnCraft.isInteractive();
        }
        btnCraft.on('pointerup', function () {
          if (this.crafter.selected) {
            this.crafter.craft();
          }
        });
      }, 0.1);
      container.addChild(btnCraft);
      btnCraft.x = 350;
      btnCraft.y = 100;
      crafter.inventory.craft.getInventoryGrid();
      crafter.inventory.craft.gridComponent.x = btnCraft.x + 50;
      crafter.inventory.craft.gridComponent.y = btnCraft.y + 50;
      container.addChild(crafter.inventory.craft.gridComponent);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Hud Crafting'
  };
  _BLUEPRINTS.COMPONENTS.component_notification = {
    "options": 'text',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      var text = options.text || "Small zbig tet little text card board box sam so ram so cam so, ru so, sim zuu asdzx asd  asd asd asd asd  asd asd  asd ad asdasd zxzxz text not so small im pretty big i am not so small im pretty big i am not so small im pretty big i amasd not so small im pretty big i am asd not so small im pretty big i amasd";
      var w = 400;
      const lines = text.split("\n");
      var h = text.length / 5 * 4;
      h = h < 200 ? 200 : h;
      if (lines > 3 && h < 250) {
        h = lines * 50;
      }
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Notification',
        moveable: true,
        showX: true,
        w: w,
        h: h
      });
      var text = game.render.mText(text, 'longerwhitedesc');
      text.x = w / 2;
      text.y = h / 2;
      text.style.wordWrap = true;
      text.style.wordWrapWidth = 300;
      text.anchor.set(0.5);
      pane.addChild(text);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Notification'
  };
  _BLUEPRINTS.COMPONENTS.hud_load = {
    "getElement": function (options) {
      var loadFiles = {
        current: {},
        slot1: {},
        slot2: {},
        slot3: {},
        slot4: {},
        slot5: {},
        slot6: {},
        slot7: {}
      };
      if (!options) {
        options = {};
      }
      if (!options.title) {
        options.title = 'New Game';
        options.type = 'load';
      }
      if (!game.globalfs.keyExists('loadfiles')) {
        game.globalfs.saveSync('loadfiles', loadFiles);
      }
      loadFiles = game.globalfs.loadSync('loadfiles');
      var w = 500;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: false,
        showX: true,
        w: w,
        h: 710
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 20;
      if (options.type == 'new') {
        var mapSelect = game.render.componentRaw('component_mapselector', {
          title: false
        });
        mapSelect.x = w + 10;
        mapSelect.y = 10;
        container.addChild(mapSelect);
        var raceSelect = game.render.componentRaw('component_raceselector', {
          title: 'Start zone'
        });
        raceSelect.x = w + 10;
        raceSelect.y = mapSelect.y + mapSelect.height - 5;
        container.addChild(raceSelect);
        var difficulty = game.render.componentRaw('component_difficulty_toggles', {
          title: 'Difficulty'
        });
        difficulty.x = w + raceSelect.width + 40;
        difficulty.y = 10;
        container.addChild(difficulty);
      }
      var column = new TickerContainer(options, function (item) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (var slot in game.grid.saveGames) {
          if (!Object.keys(game.grid.saveGames[slot]).length) {
            continue;
          }
          try {
            list.push(game.render.componentRaw('drawLoadFile', {
              slot: slot,
              type: options.type,
              loadFile: game.grid.saveGames[slot]
            }));
          } catch (e) {}
        }
        let pager = game.render.componentRaw('pager', {
          rowHeight: 50,
          ticks: true,
          page: page,
          width: w - 50,
          items: list.reverse(),
          itemsPerPage: 8
        });
        if (this.pager) {
          this.pager.destroy();
        }
        this.pager = pager;
        this.addChild(pager);
      }, 0.25);
      column.x = 20;
      column.y = 20;
      pane.addChild(column);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Hud Load Game'
  };
  _BLUEPRINTS.COMPONENTS.admin_hud_toggles = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      return new TickerContainer({}, function () {
        let w = 100;
        let h = 800;
        let page = 1;
        let list = [game.render.component('hud_checkbox', {
          name: 'New Map',
          isEnabled: function () {
            return true;
          },
          onDisable: function () {
            game.grid.createNewMap();
          }
        }), game.render.component('hud_checkbox', {
          name: 'Save Map',
          isEnabled: function () {
            return true;
          },
          onDisable: function () {
            game.grid.saveOpenChunks();
            game.notify("Saved");
          },
          onEnable: function () {
            game.grid.saveOpenChunks();
            game.notify("Saved");
          }
        }), game.render.component('hud_checkbox', {
          name: 'Overwrite Map',
          isEnabled: function () {
            return true;
          },
          onDisable: function () {
            game.grid.overwriteOpenChunks();
          },
          onEnable: function () {
            game.grid.overwriteOpenChunks();
          }
        }), game.render.component('hud_checkbox', {
          name: 'Test Map',
          isEnabled: function () {
            return true;
          },
          onDisable: function () {
            game.grid.saveOpenChunks();
            setTimeout(function () {
              let x = Math.floor(Math.abs(game.mouseX / 64 / 10));
              let y = Math.floor(Math.abs(game.mouseY / 64 / 10));
              window.open("deaddesert.html?noAudio=true&test=true&type=scene&unit=lvltest&x=" + x + "&y=" + y + "&tt=y&map=" + game.urlVar('map') + "&readOnly=true");
            }, 2500);
          },
          onEnable: function () {
            game.grid.saveOpenChunks();
            setTimeout(function () {
              let x = Math.floor(Math.abs(game.mouseX / 64 / 10));
              let y = Math.floor(Math.abs(game.mouseY / 64 / 10));
              window.open("deaddesert.html?noAudio=true&test=true&type=scene&unit=lvltest&x=" + x + "&y=" + y + "&tt=y&map=" + game.urlVar('map') + "&readOnly=true");
            }, 2500);
          }
        }), game.render.component('hud_checkbox', {
          name: 'Tablet Mode',
          isEnabled: function () {
            return game.clientMode == 'tablet';
          },
          onDisable: function () {
            game.clientMode = 'client';
          },
          onEnable: function () {
            game.clientMode = 'tablet';
          }
        }), game.render.component('hud_checkbox', {
          name: 'Gen Trees',
          isEnabled: function () {
            return game.genTrees;
          },
          onDisable: function () {
            game.genTrees = false;
          },
          onEnable: function () {
            game.genTrees = true;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Gen Grass',
          isEnabled: function () {
            return game.genGrass;
          },
          onDisable: function () {
            game.genGrass = false;
          },
          onEnable: function () {
            game.genGrass = true;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Link',
          isEnabled: function () {
            return game.util.isLinking();
          },
          onDisable: function () {
            return game.util.stopLinking();
          },
          onEnable: function () {
            return game.util.createLink();
          }
        }), game.render.component('hud_checkbox', {
          name: 'Layer 1',
          isEnabled: function () {
            return game.drawLayer == 1 || game.drawLayer == undefined;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 1;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Layer 2',
          isEnabled: function () {
            return game.drawLayer == 2;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 2;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Layer 3',
          isEnabled: function () {
            return game.drawLayer == 3;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 3;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Layer 4',
          isEnabled: function () {
            return game.drawLayer == 4;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 4;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Wall 5',
          isEnabled: function () {
            return game.drawLayer == 5;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 5;
          }
        }), game.render.component('hud_checkbox', {
          name: 'Layer6',
          isEnabled: function () {
            return game.drawLayer == 6;
          },
          onDisable: function () {},
          onEnable: function () {
            game.drawLayer = 6;
          }
        })];
        var pane = new UIContainer({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 330,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          ticks: true,
          page: page,
          width: 320,
          items: list,
          itemsPerPage: 10
        });
        pager.x = -5;
        pager.y = 10;
        pane.addChild(pager);
        this.addChild(pane);
      }, 0.5);
    },
    "parent": 'component_huds',
    "name": 'Hud Admin Toggles'
  };
  _BLUEPRINTS.COMPONENTS.hud_map = {
    "options": 'recycler',
    "getElement": function (options) {
      let isRightClick = function (event) {
        if (event.which) {
          return event.which == 3;
        } else {
          return event.data.originalEvent.which == 3;
        }
      };
      if (!options) {
        options = {};
      }
      const zones = game.session.data.zones;
      var recycler = options.recycler;
      const locs = {
        "landzo": {
          x: 7,
          y: 9
        },
        "bleak": {
          x: 9.5,
          y: 7.1
        },
        "redtown": {
          x: 5,
          y: 6.4
        }
      };
      var w = 800;
      var h = 800;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: false,
        showX: false,
        w: w,
        h: h
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 25;
      container.y = 25;
      const mapViewport = new Viewport.Viewport({
        screenWidth: w - 50,
        screenHeight: h - 50,
        worldWidth: 1000,
        worldHeight: 1000,
        interaction: game.render.pixi.renderer.plugins.interaction
      });
      container.addChild(mapViewport);
      mapViewport.drag({
        mouseButtons: 'left',
        clampWheel: true
      }).wheel().pinch({
        'noDrag': true,
        percent: 5
      }).decelerate();
      mapViewport.clamp({
        direction: 'all'
      });
      mapViewport.addChild(new Sprite('sprite_world_map'));
      mapViewport.on('clicked', function (event) {
        event.event.stopPropagation();
        if (isRightClick(event.event)) {
          let gotoX = event.world.x * 64;
          let gotoY = event.world.y * 64;
          game.session.setAllCommand('moveto', {
            x: Math.ceil(gotoX),
            y: Math.ceil(gotoY)
          });
        }
      });
      mapViewport.fit();
      for (let key in locs) {
        const loc = locs[key];
        const citySprite = new Sprite('sprite_icon_city');
        citySprite.x = loc.x * 100 - 32;
        citySprite.y = loc.y * 100 - 32;
        mapViewport.addChild(citySprite);
        const zone = game.session.getNamedZone(key);
        let desc = "";
        let shops = "\n \nShops:";
        shops = shops + "\nScrap shop";
        shops = shops + "\nWeapon shop";
        shops = shops + "\nClone bar";
        desc = desc + "Faction Owner: " + zone.meta.faction + "\nPopulation: High" + shops;
        game.inventories.attachHoverFunctions(citySprite, {
          data: {
            name: zone.name,
            description: desc
          }
        });
      }
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF3300);
      graphics.drawRect(0, 0, mapViewport.screenWidth, mapViewport.screenHeight);
      graphics.endFill();
      container.addChild(graphics);
      mapViewport.mask = graphics;
      let playerPos = new Sprite('mask_thejester');
      playerPos.width = 32;
      playerPos.height = 32;
      playerPos.x = game.p.x / 64;
      playerPos.y = game.p.y / 64;
      game.mapMarker = playerPos;
      mapViewport.addChild(playerPos);
      mapViewport.ensureVisible(playerPos.x, playerPos.y, 200, 200);
      game.setTicker('movemap', function () {
        if (!game.mapMarker || game.editMode || !game.p || !game.p.x) return;
        game.mapMarker.x = game.p.x / 64;
        game.mapMarker.y = game.p.y / 64;
        game.mapMarker.x -= 16;
        game.mapMarker.y -= 16;
      });
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Hud Map'
  };
  _BLUEPRINTS.COMPONENTS.player_hud_toggles = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      return new TickerContainer({}, function () {
        let w = 100;
        let h = 800;
        let page = 1;
        let list = [game.render.component('hud_checkbox', {
          name: 'Move',
          isEnabled: function () {
            return game.session.getCommand() == 'move';
          },
          onEnable: function () {
            game.session.setAllCommand('move');
          }
        }), game.render.component('hud_checkbox', {
          name: 'Defend',
          isEnabled: function () {
            return game.session.getCommand() == 'defend';
          },
          onEnable: function () {
            game.session.setAllCommand('defend');
          }
        }), game.render.component('hud_checkbox', {
          name: 'Attack',
          isEnabled: function () {
            return game.session.getCommand() == 'attack';
          },
          onEnable: function () {
            game.session.setAllCommand('attack');
          }
        }), game.render.component('hud_checkbox', {
          name: 'Jobs',
          isEnabled: function () {
            return game.session.getCommand() == 'jobs';
          },
          onEnable: function () {
            game.session.setAllCommand('jobs');
          }
        }), game.render.component('hud_checkbox', {
          name: 'Stay',
          isEnabled: function () {
            return game.session.getCommand() == 'stay';
          },
          onEnable: function () {
            game.session.setAllCommand('stay');
          }
        })];
        var pane = new UIContainer({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 330,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          ticks: true,
          page: page,
          width: 320,
          items: list,
          itemsPerPage: 10
        });
        pager.x = -5;
        pager.y = 10;
        pane.addChild(pager);
        this.addChild(pane);
      }, 0.1);
    },
    "parent": 'component_huds',
    "name": 'Pawn Commands'
  };
  _BLUEPRINTS.COMPONENTS.player_hud_pawns = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      return new TickerContainer({}, function () {
        let w = 100;
        let h = 800;
        let page = 1;
        let pawns = game.session.getPlayerPawns();
        let ids = Object.keys(pawns);
        let list = [];
        for (let i = 0; i < ids.length; i++) {
          let pawn = pawns[ids[i]];
          let add = game.render.component('hud_checkbox', {
            name: pawn.data.name || 'Citizen',
            pawn: pawn,
            isEnabled: function () {
              return game.session.isSelected(this.options.pawn);
            },
            onDisable: function () {
              game.p = this.options.pawn;
              game.session.deselectPawns();
              game.session.selectPawn(this.options.pawn);
              game.cameraFollow = game.p;
            },
            onEnable: function () {
              game.p = this.options.pawn;
              game.session.deselectPawns();
              game.session.selectPawn(this.options.pawn);
            }
          });
          if (i > 0) {
            if (pawns[ids[i - 1]].data.ownedAge < pawn.data.ownedAge) {
              list.unshift(add);
            } else {
              list.push(add);
            }
          } else {
            list.push(add);
          }
        }
        var pane = new UIContainer({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 330,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          ticks: true,
          page: page,
          width: 320,
          items: list,
          itemsPerPage: 10
        });
        pager.x = -5;
        pager.y = 10;
        pane.addChild(pager);
        this.addChild(pane);
      }, 0.1);
    },
    "parent": 'component_huds',
    "name": 'player_pawns'
  };
  _BLUEPRINTS.COMPONENTS.admin_hud_utils = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      return new TickerContainer({}, function () {
        let w = 100;
        let h = 800;
        let page = 1;
        let list = [];
        let utils = Object.keys(game.util);
        for (let i = 0; i < utils.length; i++) {
          if (typeof game.util[utils[i]] == 'function') {
            list.push(game.render.component('hud_button', {
              name: utils[i],
              onClick: game.util[utils[i]]
            }));
          }
        }
        var pane = new UIContainer({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 330,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          ticks: true,
          page: page,
          width: 320,
          items: list,
          itemsPerPage: 10
        });
        pager.x = -5;
        pager.y = 10;
        pane.addChild(pager);
        this.addChild(pane);
      }, 0.5);
    },
    "parent": 'component_huds',
    "name": 'admin_hud_utils'
  };
  _BLUEPRINTS.COMPONENTS.panel_settings = {
    "getElement": function () {
      let w = 800;
      let h = 690;
      var container = game.render.componentRaw('drawBoxPane', {
        title: 'Settings',
        moveable: false,
        w: w,
        h: h,
        showX: true
      });
      var pane = new UIContainer();
      container.addChild(pane);
      pane.x = 40;
      pane.y = 50;
      let booleans = ['showTut', 'advancedFilters', 'particles', 'damage', 'blood', 'performance'];
      let descs = ['Enables showing the tutorial', 'Advanced filters`nDisable for more FPS', 'Particles`nEffects animations like gun shrapnel', 'Floating damage numbers`nDisable if slow framerate', 'Blood`nDisable if slow framerate or dislike', 'Soft Loading`nEnable if game jerks between areas'];
      let padding = 5;
      let note = game.render.text('Note: You may have to restart for changes to take effect', 'ingame-label');
      note.x = 5;
      pane.addChild(note);
      let volume = game.render.text('Volume', 'ingame-label');
      pane.addChild(volume);
      volume.y = 30;
      volume.x = 5;
      var audio = game.render.componentRaw('hud_counter', {
        ref: game.settings,
        value: 'musicValue',
        max: 10,
        min: 0
      });
      pane.addChild(audio);
      audio.y = 60;
      let offsetX = pane.x;
      let offsetY = pane.y + 60 + padding;
      for (let i = 0; i < booleans.length; i++) {
        let value = booleans[i];
        let desc = descs[i];
        var setting = game.render.componentRaw('drawBoxPane', {
          moveable: false,
          w: 700,
          h: 75,
          showX: false
        });
        pane.addChild(setting);
        setting.y = offsetY;
        let text = game.render.text(desc, 'ingame-label');
        setting.addChild(text);
        text.x = 20;
        text.y = 20;
        let checkbox = game.render.component('hud_checkbox', {
          value: value,
          isEnabled: function () {
            return game.settings[this.value];
          },
          onDisable: function () {
            game.settings[this.value] = false;
          },
          onEnable: function () {
            game.settings[this.value] = true;
          }
        });
        checkbox.y = 17.5;
        checkbox.x = 520;
        setting.addChild(checkbox);
        offsetY += setting.height + padding;
      }
      return container;
    },
    "parent": 'component_huds',
    "name": 'Panel Settings'
  };
  _BLUEPRINTS.COMPONENTS.hud_tutsteps = {
    "getElement": function (options) {
      let container = new UIContainer();
      let tutSteps = {
        found_weapon: 'Find a weapon',
        found_armor: 'Find armour',
        found_food: 'Find food',
        placed_campfire: 'Place a campfire',
        recruit_member: 'Recruit a squad member',
        join_faction: 'Join a faction',
        establish_base: 'Build a base',
        complete_bounty: 'Complete a bounty'
      };
      let keys = Object.keys(tutSteps);
      let yOffset = 0;
      for (let i = 0; i < keys.length; i++) {
        if (game.session.data.tut_steps[keys[i]]) {
          continue;
        }
        let desc = tutSteps[keys[i]];
        let text = game.render.text(':: ' + desc, 'ingame-label');
        container.addChild(text);
        text.y = yOffset;
        yOffset += 20;
      }
      return container;
    },
    "parent": 'component_huds',
    "name": 'Tutorial Steps'
  };
  _BLUEPRINTS.COMPONENTS.hud_mini_map = {
    "options": 'recycler',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      var recycler = options.recycler;
      var w = 200;
      var h = 200;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: true,
        showX: false,
        w: w,
        h: h
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 5;
      container.y = 5;
      viewport = new Viewport.Viewport({
        screenWidth: w - 10,
        screenHeight: h - 10,
        worldWidth: 1000,
        worldHeight: 1000,
        interaction: game.render.pixi.renderer.plugins.interaction
      });
      container.addChild(viewport);
      viewport.drag({
        mouseButtons: 'left',
        clampWheel: true
      }).wheel().pinch({
        'noDrag': true,
        percent: 5
      }).decelerate();
      viewport.clamp({
        direction: 'all'
      });
      viewport.addChild(new Sprite('sprite_world_map'));
      const graphics = new PIXI.Graphics();
      graphics.beginFill(0xFF3300);
      graphics.drawRect(0, 0, viewport.screenWidth, viewport.screenHeight);
      graphics.endFill();
      container.addChild(graphics);
      viewport.mask = graphics;
      let playerPos = new Sprite('mask_thejester');
      playerPos.width = 32;
      playerPos.height = 32;
      playerPos.x = game.p.x / 64;
      playerPos.y = game.p.y / 64;
      game.mapMarker2 = playerPos;
      viewport.addChild(playerPos);
      viewport.ensureVisible(playerPos.x, playerPos.y, 200, 200);
      game.minimap = viewport;
      game.setTicker('moveminimap', function () {
        game.mapMarker2.x = game.p.x / 64;
        game.mapMarker2.y = game.p.y / 64;
        game.mapMarker2.x -= 16;
        game.mapMarker2.y -= 16;
        game.minimap.moveCenter(game.p.x / 64, game.p.y / 64);
      });
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Mini Map'
  };
  _BLUEPRINTS.COMPONENTS.panel_keybinds = {
    "getElement": function () {
      let w = 800;
      let h = 800;
      var container = game.render.componentRaw('drawBoxPane', {
        title: 'Settings',
        moveable: false,
        w: w,
        h: h,
        showX: false
      });
      var pane = new UIContainer();
      container.addChild(pane);
      pane.x = 40;
      pane.y = 50;
      let booleans = ['showTut', 'particles', 'lights', 'bloom', 'blood', 'performance'];
      let descs = ['Enables showing the tutorial', 'Particles`nEffects animations like gun shrapnel', 'Advanced Lights`nDisable if slow framerate', 'Advanced Bloom`nDisable if slow framerate', 'Blood`nDisable if slow framerate or dislike', 'Soft Loading`nEnable if game jerks between areas'];
      let padding = 10;
      let note = game.render.text('Note: You may have to restart for changes to take effect', 'ingame-label');
      pane.addChild(note);
      let volume = game.render.text('Volume', 'ingame-label');
      pane.addChild(volume);
      volume.y = 50;
      volume.x = 5;
      var audio = game.render.componentRaw('hud_counter', {
        ref: game.settings,
        value: 'musicValue',
        max: 10,
        min: 0
      });
      pane.addChild(audio);
      audio.y = 80;
      let offsetX = pane.x;
      let offsetY = pane.y + 100 + padding;
      for (let i = 0; i < booleans.length; i++) {
        let value = booleans[i];
        let desc = descs[i];
        var setting = game.render.componentRaw('drawBoxPane', {
          moveable: false,
          w: 700,
          h: 75,
          showX: false
        });
        pane.addChild(setting);
        setting.y = offsetY;
        let text = game.render.text(desc, 'ingame-label');
        setting.addChild(text);
        text.x = 20;
        text.y = 20;
        let checkbox = game.render.component('hud_checkbox', {
          value: value,
          isEnabled: function () {
            return game.settings[this.value];
          },
          onDisable: function () {
            game.settings[this.value] = false;
          },
          onEnable: function () {
            game.settings[this.value] = true;
          }
        });
        checkbox.y = 17.5;
        checkbox.x = 520;
        setting.addChild(checkbox);
        offsetY += setting.height + padding;
      }
      var closeBtn = game.render.componentRaw('hud_button', {
        name: 'Close'
      });
      container.addChild(closeBtn);
      closeBtn.x = w - 210;
      closeBtn.y = h - 100;
      closeBtn.on('pointerup', function () {
        game.ui.close('panel_settings');
      });
      return container;
    },
    "parent": 'component_huds',
    "name": 'Panel Key Binds'
  };
  _BLUEPRINTS.COMPONENTS.hud_bench_crafting = {
    "options": 'crafter',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let crafter = options.crafter;
      let knownRecipes = [];
      if (crafter) {
        knownRecipes = game.session.getUnlockedRecipes(crafter.data.recipeList) || ['metalingot'];
      }
      if (!crafter) {
        crafter = new ComplexItem('pers_worlditem_smelter');
        crafter.data.recipeList = 'smelter';
        crafter.onCreate();
        knownRecipes = ['metalingot'];
      }
      game.crafting = {};
      var allRecipes = {};
      allRecipes = game.session.getUnlockedRecipesList(crafter.data.recipeList);
      var w = 390;
      var h = 480;
      var outer = new UIContainer();
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Workbench',
        moveable: true,
        showX: true,
        w: w,
        h: h + 50
      });
      pane.x = 500;
      outer.addChild(pane);
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 30;
      crafter.knownRecipes = knownRecipes;
      crafter.allRecipes = allRecipes;
      crafter.genRecipe = function (crafter, recipeName, recipe) {
        recipe = _BLUEPRINTS.RECIPES['recipe_' + recipeName];
        if (!recipe) {
          recipe = _BLUEPRINTS.RECIPES['recipe_ss_item_' + recipeName];
          recipeName = 'ss_item_' + recipeName;
        }
        var component = game.render.component('component_blueprint', {
          name: recipeName,
          recipe: recipe
        });
        component.isInteractive();
        component.recipe = recipeName;
        component.recipeName = recipeName;
        component.crafter = crafter;
        let rec = _BLUEPRINTS.RECIPES['recipe_' + recipeName];
        game.inventories.attachHoverFunctions(component, new InventoryItem(rec.crafts), true);
        component.on('pointerup', function () {
          if (this.crafter.selected == this.recipeName) {
            this.crafter.selected = false;
            return;
          }
          this.crafter.selected = this.recipeName;
          this.crafter.recipe = this.recipe;
        });
        if (crafter.selected !== recipeName) {
          component.alpha = 0.5;
        }
        return component;
      };
      var column = new TickerContainer(crafter, function (crafter) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (let i = 0; i < crafter.knownRecipes.length; i++) {
          list.push(crafter.genRecipe(crafter, crafter.knownRecipes[i], crafter.allRecipes[crafter.knownRecipes[i]]));
        }
        this.pane = new UIPane({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 350,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          template: 'pagergrid',
          ticks: true,
          page: page,
          width: 340,
          items: list,
          itemsPerPage: 4 * 4
        });
        pager.x = -5;
        pager.y = 10;
        this.pager = pager;
        this.pane.addChild(pager);
        this.addChild(this.pane);
      }, function () {
        let crafter = this.ref;
        let refresh = this.lastRecipe === crafter.recipe;
        this.lastRecipe = crafter.recipe;
        return refresh;
      });
      column.lastRecipe = 'whatever';
      container.addChild(column);
      let btnCraft = new TickerContainer(crafter, function (crafter) {
        let alpha = 1;
        if (!crafter.selected || crafter.selected.length == 0) {
          alpha = 0.25;
        }
        let title = 'Craft item';
        let btnCraft = game.render.component('hud_button', {
          name: title,
          w: 150
        });
        btnCraft.alpha = alpha;
        this.addChild(btnCraft);
        btnCraft.crafter = crafter;
        if (alpha !== 1) {
          return;
        }
        if (alpha == 1) {
          btnCraft.isInteractive();
        }
        btnCraft.on('pointerup', function () {
          this.crafter.queue.addItem(this.crafter.recipe);
        });
      }, 0.05);
      container.addChild(btnCraft);
      btnCraft.x = w - 200;
      btnCraft.y = h - 40;
      let btnInventory = game.render.component('hud_button', {
        name: 'Inventory',
        w: 150
      });
      pane.addChild(btnInventory);
      btnInventory.x = 20;
      btnInventory.y = btnCraft.y + 30;
      btnInventory.crafter = crafter;
      btnInventory.on('pointerup', function () {
        this.crafter.showInventory();
      });
      let queuePane = game.render.componentRaw('drawBoxPane', {
        title: 'Queue',
        moveable: true,
        showX: false,
        w: w + 90,
        h: h + 10
      });
      queuePane.x -= 500;
      queuePane.y = 0;
      let queue = game.render.componentRaw('component_list_queue', crafter);
      queuePane.addChild(queue);
      queue.x = 20;
      queue.y = 20;
      pane.addChild(queuePane);
      return outer;
    },
    "parent": 'component_huds',
    "name": 'Hud Bench Crafting'
  };
  _BLUEPRINTS.COMPONENTS.hud_new_game = {
    "getElement": function (options) {
      var loadFiles = {
        current: {},
        slot1: {},
        slot2: {},
        slot3: {},
        slot4: {},
        slot5: {},
        slot6: {},
        slot7: {}
      };
      if (!options) {
        options = {};
      }
      if (!options.title) {
        options.title = 'New Game';
        options.type = 'new';
      }
      if (!game.globalfs.keyExists('loadfiles')) {
        game.globalfs.saveSync('loadfiles', loadFiles);
      }
      loadFiles = game.globalfs.loadSync('loadfiles');
      var w = 0;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: false,
        showX: true,
        w: w + 1200,
        h: 690,
        corner: "both"
      });
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 20;
      if (options.type == 'new') {
        var raceSelect = game.render.componentRaw('component_raceselector', {
          title: 'Start zone'
        });
        raceSelect.x = 0;
        raceSelect.y = 15;
        container.addChild(raceSelect);
        var difficulty = game.render.componentRaw('component_difficulty_toggles', {
          title: 'Difficulty'
        });
        difficulty.x = w + raceSelect.width - 60;
        difficulty.y = 10;
        container.addChild(difficulty);
        var spawn = game.render.componentRaw('component_spawnloc_picker', {
          w: 280
        });
        spawn.x = container.width + 30 - 120;
        spawn.y = 20;
        container.addChild(spawn);
      }
      let startGame = game.render.componentRaw('drawLoadFile', {
        slot: 'slot1',
        type: options.type,
        loadFile: loadFiles.slot1,
        w: 190
      });
      startGame.y = pane.height - startGame.height - 40;
      startGame.x = pane.width - startGame.width + 50;
      pane.addChild(startGame);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Hud Advanced Start'
  };
  _BLUEPRINTS.COMPONENTS.hud_bench_research = {
    "options": 'crafter',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let crafter = options.crafter;
      if (!crafter) {
        crafter = new ComplexItem('pers_worlditem_craftingbench');
        crafter.onCreate();
      }
      var knownRecipes = game.session.getUnlockedRecipes('player') || ['pickaxe'];
      game.crafting = {};
      var allRecipes = {};
      allRecipes = game.session.getUnlockedRecipesList('player');
      var w = 390;
      var h = 480;
      var outer = new UIContainer();
      var pane = game.render.componentRaw('drawBoxPane', {
        title: 'Workbench',
        moveable: true,
        showX: true,
        w: w,
        h: h + 50
      });
      pane.x = 500;
      outer.addChild(pane);
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 30;
      var listX = -30;
      crafter.knownRecipes = knownRecipes;
      crafter.allRecipes = allRecipes;
      crafter.genRecipe = function (crafter, recipeName, recipe) {
        var component = game.render.component('component_blueprint', {
          name: recipeName,
          recipe: _BLUEPRINTS.RECIPES['recipe_' + recipeName]
        });
        component.isInteractive();
        component.recipe = recipe;
        component.recipeName = recipeName;
        component.crafter = crafter;
        component.on('pointerup', function () {
          if (this.crafter.selected == this.recipeName) {
            this.crafter.selected = false;
            return;
          }
          this.crafter.selected = this.recipeName;
          this.crafter.recipe = this.recipe;
        });
        if (crafter.selected !== recipeName) {
          component.alpha = 0.5;
        }
        return component;
      };
      var column = new TickerContainer(crafter, function (crafter) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (let i = 0; i < crafter.knownRecipes.length; i++) {
          list.push(crafter.genRecipe(crafter, crafter.knownRecipes[i], crafter.allRecipes[crafter.knownRecipes[i]]));
        }
        this.pane = new UIPane({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 5,
          w: 350,
          h: h - 55
        });
        let pager = game.render.componentRaw('pager', {
          template: 'pagergrid',
          ticks: true,
          page: page,
          width: 340,
          items: list,
          itemsPerPage: 4 * 4
        });
        pager.x = -5;
        pager.y = 10;
        this.pager = pager;
        this.pane.addChild(pager);
        this.addChild(this.pane);
      }, function () {
        let crafter = this.ref;
        let refresh = this.lastRecipe === crafter.recipe;
        this.lastRecipe = crafter.recipe;
        return refresh;
      });
      column.lastRecipe = 'whatever';
      container.addChild(column);
      let btnCraft = new TickerContainer(crafter, function (crafter) {
        let alpha = 1;
        if (!crafter.selected || crafter.selected.length == 0) {
          alpha = 0.25;
        }
        let title = 'Craft item';
        let btnCraft = game.render.component('hud_button', {
          name: title,
          w: 150
        });
        btnCraft.alpha = alpha;
        this.addChild(btnCraft);
        btnCraft.crafter = crafter;
        if (alpha !== 1) {
          return;
        }
        if (alpha == 1) {
          btnCraft.isInteractive();
        }
        btnCraft.on('pointerup', function () {
          this.crafter.queue.addItem(this.crafter.recipe);
        });
      }, 0.05);
      container.addChild(btnCraft);
      btnCraft.x = w - 200;
      btnCraft.y = h - 40;
      let btnInventory = game.render.component('hud_button', {
        name: 'Inventory',
        w: 150
      });
      pane.addChild(btnInventory);
      btnInventory.x = 20;
      btnInventory.y = btnCraft.y + 30;
      btnInventory.crafter = crafter;
      btnInventory.on('pointerup', function () {
        this.crafter.showInventory();
      });
      let queuePane = game.render.componentRaw('drawBoxPane', {
        title: 'Queue',
        moveable: true,
        showX: false,
        w: w + 90,
        h: h + 10
      });
      queuePane.x -= 500;
      queuePane.y = 0;
      let queue = game.render.componentRaw('component_list_queue', crafter);
      queuePane.addChild(queue);
      queue.x = 20;
      queue.y = 20;
      pane.addChild(queuePane);
      return outer;
    },
    "parent": 'component_huds',
    "name": 'Hud Research Bench'
  };
  _BLUEPRINTS.COMPONENTS.hud_player_card = {
    "options": 'player',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      if (options.player) {
        var isPlayerPawn = true;
        options.player = game.p;
      } else {
        var isPlayerPawn = false;
        options.player = game.watching || new LifeObject();
      }
      var w = 500;
      var h = 225;
      var statsXOffset = 235;
      var buttonsXOffset = 5;
      var statsYOffset = 15;
      var statSpace = 25;
      var offsetX = 20;
      var offsetY = 15;
      var hasPlayer = true;
      var pane = game.render.componentRaw('drawBoxPane', {
        showX: game.editMode,
        name: 'test',
        callerObject: options.player,
        x: 0,
        y: 0,
        w: w,
        h: h
      });
      if (!options.player || options.player.class !== 'LifeObject') {
        hasPlayer = options.player;
      }
      if (hasPlayer) {
        const str = `${options.player.data.faction} ${options.player.getSpecies()}`;
        const firstChar = str.charAt(0).toUpperCase();
        const remainingChars = str.slice(1);
        const altName = `${firstChar}${remainingChars}`;
        let npcName = options.player.data.name || altName;
        if (options.player.data.bounty && options.player.data.bounty > 0) {
          let bounty = game.render.componentRaw('drawLabel', {
            name: 'Bounty',
            value: options.player.data.bounty,
            h: 32
          });
          bounty.y -= 32;
          bounty.x = pane.width - bounty.width;
          pane.addChild(bounty);
        }
        var name = game.render.text(npcName, 'ui-title');
        name.x = offsetX;
        name.y = offsetY;
        offsetY += 30;
        pane.addChild(name);
        var name = game.render.text(options.player.data.faction + " " + options.player.getSpecies(), 'ingame-label');
        name.x = offsetX;
        name.y = offsetY;
        offsetY += 25;
        pane.addChild(name);
        if (!options.player.data.name) {
          name.alpha = 0;
        }
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('statBar', {
            callerObject: options.player,
            valueKey: 'hp',
            w: 200,
            h: 25,
            name: 'Health',
            maxValue: this.ref.data.stats.maxHP,
            value: this.ref.data.stats.hp < 0 ? 0 : Math.floor(this.ref.data.stats.hp),
            fill: 0x990000
          });
          this.addChild(this.stat);
        }, 0.5);
        stat.x = offsetX;
        stat.y = offsetY;
        pane.addChild(stat);
        offsetY += 30;
        var stat = new TickerContainer(options.player, function (player) {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('statBar', {
            callerObject: player,
            valueKey: 'torp',
            w: 200,
            h: 25,
            name: 'Torpor',
            maxValue: this.ref.data.stats.maxTorp,
            value: this.ref.data.stats.torp < 0 ? 0 : Math.floor(this.ref.data.stats.torp),
            fill: 0x6162A2
          });
          this.addChild(this.stat);
        }, 0.5);
        stat.x = offsetX;
        stat.y = offsetY;
        offsetY += 35;
        pane.addChild(stat);
        const statusEffects = game.render.componentRaw('component_status_effects', {
          life: options.player
        });
        statusEffects.x = offsetX;
        statusEffects.y = offsetY;
        pane.addChild(statusEffects);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Savage',
            value: this.ref.data.levels.savage.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Melee',
            value: this.ref.data.levels.melee.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Athletics',
            value: this.ref.data.levels.athletics.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Ranged',
            value: this.ref.data.levels.ranged.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Toughness',
            value: this.ref.data.levels.toughness.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
        var stat = new TickerContainer(options.player, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.componentRaw('drawLabel', {
            name: 'Strength',
            value: this.ref.data.levels.strength.level,
            h: 32
          });
          this.addChild(this.stat);
        }, 5);
        stat.x = statsXOffset;
        stat.y = statsYOffset;
        statsYOffset += statSpace;
        pane.addChild(stat);
      }
      if (!hasPlayer) {
        statsYOffset += 200 - 50;
      }
      statsYOffset += 15;
      if (isPlayerPawn) {
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Inventory',
          w: 130
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          game.p.showInventory();
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Craft',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          var crafting = game.render.component('hud_crafting', {
            crafter: game.p
          }, 'craft' + game.p.id);
          crafting.x = 20;
          crafting.y = 20;
          game.render.aboveAll.addChild(crafting);
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Stats',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          var stats = game.render.component('hud_stats', {
            player: game.p
          }, 'stats' + game.p.id);
          stats.x = 20;
          stats.y = 20;
          game.render.aboveAll.addChild(stats);
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Map',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        pane.noClickThrough();
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          var map = game.render.component('hud_world_tabs', {
            tabIndex: 1
          }, 'hud_world_tabs');
          map.x = 100;
          map.y = 100;
          game.render.aboveAll.addChild(map);
        });
      }
      if (!isPlayerPawn) {
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Build',
          w: 130
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          game.setBuildMode();
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Research',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          var hud_researchmenu = game.render.component('hud_researchmenu', {}, 'hud_researchmenu');
          hud_researchmenu.x = 20;
          hud_researchmenu.y = 20;
          game.render.aboveAll.addChild(hud_researchmenu);
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'World',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          var map = game.render.component('hud_world_tabs', {
            tabIndex: 0
          }, 'hud_world_tabs');
          map.x = 100;
          map.y = 100;
          game.render.aboveAll.addChild(map);
        });
        var hudButton = game.render.componentRaw('hud_button', {
          name: 'Menu',
          w: 120
        });
        hudButton.x = buttonsXOffset;
        hudButton.y = statsYOffset;
        buttonsXOffset += hudButton.width;
        pane.addChild(hudButton);
        pane.noClickThrough();
        hudButton.isInteractive();
        hudButton.on('pointerup', function () {
          game.render.aboveAll.addChild(game.render.component('frontMenu', {
            close: true
          }, 'frontMenu'));
        });
      }
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Player card'
  };
  _BLUEPRINTS.COMPONENTS.life_inventory = {
    "getElement": function (life) {
      if (life == undefined) {
        life = new LifeObject();
      }
      var offsetX = 17.5;
      var offsetY = 80;
      var xGap = 125;
      var yGap = 125;
      var title = life.data.name || 'Inventory';
      var closeCleanup = function (callerObject) {
        var indexName = 'life_inventory';
        var indexKey = 'container' + callerObject.id;
        game.index.removeFromIndex(indexName, indexKey, false);
      };
      var pane = game.render.componentRaw('drawBoxPane', {
        onTop: true,
        moveable: true,
        showX: true,
        name: 'test',
        callerObject: life,
        title: title,
        w: 460,
        h: 460,
        onClose: closeCleanup
      });
      game.lastLifeInventory = life.inventory.main;
      pane.life = life;
      pane.isInteractive();
      pane.on('pointerdown', function () {
        game.lastLifeInventory = this.life.inventory.main;
      });
      let edgeCase1 = new TickerContainer({
        life: life,
        pane: pane
      }, function (options) {
        if (!game.session.isPlayerPawn(options.life) && !options.life.data.dead && !options.life.data.ko && !game.editMode) {
          options.pane.close.emit('pointerup');
        }
      }, 1);
      pane.addChild(edgeCase1);
      if (game.session.isPlayerPawn(life)) {
        var stat = new TickerContainer({}, function () {
          if (this.stat) {
            this.stat.destroy();
          }
          this.stat = game.render.component('moneyLabel', {
            value: game.session.data.cash
          });
          this.addChild(this.stat);
        }, 0.5);
        stat.x = 20;
        stat.y = 30;
        pane.addChild(stat);
      }
      let label = new TickerContainer({
        life: life,
        pane: pane
      }, function (options) {
        if (this.label) {
          this.label.destroy();
        }
        options.life.data.stats.maxWeight = options.life.data.stats.maxWeight || 50;
        this.label = game.render.componentRaw('drawLabel', {
          name: 'Weight (kg)',
          value: options.life.data.stats.weight + '/' + options.life.getMaxWeight(),
          h: 35,
          w: 230
        });
        this.addChild(this.label);
      }, 1);
      label.x = offsetX + 180;
      label.y = 25;
      pane.addChild(label);
      var inv = game.ui.displayInventoryAsSlot('WEAPON', life.inventory.weapon);
      inv.x = offsetX;
      inv.y = offsetY;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('HEAD', life.inventory.mask);
      inv.x = offsetX + xGap;
      inv.y = offsetY;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('BRAIN', life.inventory.brain);
      inv.x = offsetX + xGap + xGap - 30;
      inv.y = offsetY;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('BACK WEAPON', life.inventory.backWeapon);
      inv.x = offsetX;
      inv.y = offsetY + yGap;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('BODY', life.inventory.body);
      inv.x = offsetX + xGap;
      inv.y = offsetY + yGap;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('HANDS', life.inventory.hands);
      inv.x = offsetX + xGap + xGap - 30;
      inv.y = offsetY + yGap;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('BACKPACK', life.inventory.backPack);
      inv.x = offsetX;
      inv.y = offsetY + yGap + yGap;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('LEGS', life.inventory.legs);
      inv.x = offsetX + xGap;
      inv.y = offsetY + yGap + yGap;
      pane.addChild(inv);
      var inv = game.ui.displayInventoryAsSlot('INVENTORY', life.inventory.main);
      inv.x = offsetX + xGap + xGap + xGap - 60;
      inv.y = offsetY;
      pane.addChild(inv);
      var hudButton = game.render.componentRaw('hud_button', {
        name: 'Backpack',
        w: 130
      });
      hudButton.x = inv.x - 50;
      hudButton.y = offsetY + 260;
      hudButton.alpha = 0.5;
      pane.addChild(hudButton);
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {
        game.p.showInventory();
      });
      var hudButton = game.render.componentRaw('hud_button', {
        name: 'Mods',
        w: 130
      });
      hudButton.x = inv.x - 50;
      hudButton.y = offsetY + 260 + 50;
      pane.addChild(hudButton);
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {
        game.p.showInventory();
      });
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Life Inventory'
  };
  _BLUEPRINTS.COMPONENTS.hud_shoot_types = {
    "getElement": function () {
      var pane = game.render.componentRaw('drawBoxPane', {
        showX: game.editMode,
        x: 0,
        y: 0,
        w: 200,
        h: 60
      });
      var icon = new Sprite('icon_shoot_sniper');
      icon.id = 'icon_shoot_sniper';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15;
      icon.y = 15;
      icon.alpha = game.playerGlobals.shootType == 'sniper' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var sn = game.index.getFromIndex('icon_shoot_sniper', 'hud_elements');
        var sp = game.index.getFromIndex('icon_shoot_spray', 'hud_elements');
        var ba = game.index.getFromIndex('icon_shoot_balance', 'hud_elements');
        sn.alpha = 1;
        sp.alpha = 0.25;
        ba.alpha = 0.25;
      });
      pane.addChild(icon);
      icon = new Sprite('icon_shoot_spray');
      icon.id = 'icon_shoot_spray';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15 + 10 + 32;
      icon.y = 15;
      icon.alpha = game.playerGlobals.shootType == 'spray' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var sn = game.index.getFromIndex('icon_shoot_sniper', 'hud_elements');
        var sp = game.index.getFromIndex('icon_shoot_spray', 'hud_elements');
        var ba = game.index.getFromIndex('icon_shoot_balance', 'hud_elements');
        sn.alpha = 0.25;
        sp.alpha = 1;
        ba.alpha = 0.25;
      });
      pane.addChild(icon);
      icon = new Sprite('icon_shoot_balance');
      icon.id = 'icon_shoot_balance';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15 + 10 + 32 + 10 + 32;
      icon.y = 15;
      icon.alpha = game.playerGlobals.shootType == 'balance' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var sn = game.index.getFromIndex('icon_shoot_sniper', 'hud_elements');
        var sp = game.index.getFromIndex('icon_shoot_spray', 'hud_elements');
        var ba = game.index.getFromIndex('icon_shoot_balance', 'hud_elements');
        sn.alpha = 0.25;
        sp.alpha = 0.25;
        ba.alpha = 1;
      });
      pane.addChild(icon);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'HUD Shoot types'
  };
  _BLUEPRINTS.COMPONENTS.hud_run_types = {
    "getElement": function () {
      var pane = game.render.componentRaw('drawBoxPane', {
        showX: game.editMode,
        x: 0,
        y: 0,
        w: 200,
        h: 60
      });
      var icon = new Sprite('icon_stance_crouch');
      icon.id = 'icon_stance_crouch';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15;
      icon.y = 15;
      icon.alpha = game.playerGlobals.stance == 'crouch' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var cr = game.index.getFromIndex('icon_stance_crouch', 'hud_elements');
        var wa = game.index.getFromIndex('icon_stance_walk', 'hud_elements');
        var ru = game.index.getFromIndex('icon_stance_run', 'hud_elements');
        cr.alpha = 1;
        wa.alpha = 0.25;
        ru.alpha = 0.25;
      });
      pane.addChild(icon);
      var icon = new Sprite('icon_stance_walk');
      icon.id = 'icon_stance_walk';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15 + 10 + 32;
      icon.y = 15;
      icon.alpha = game.playerGlobals.stance == 'walk' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var cr = game.index.getFromIndex('icon_stance_crouch', 'hud_elements');
        var wa = game.index.getFromIndex('icon_stance_walk', 'hud_elements');
        var ru = game.index.getFromIndex('icon_stance_run', 'hud_elements');
        cr.alpha = 0.25;
        wa.alpha = 1;
        ru.alpha = 0.25;
      });
      pane.addChild(icon);
      var icon = new Sprite('icon_stance_run');
      icon.id = 'icon_stance_run';
      game.index.addToIndex('hud_elements', icon);
      icon.setScale(0.5);
      icon.x = 15 + 10 + 32 + 10 + 32;
      icon.y = 15;
      icon.alpha = game.playerGlobals.stance == 'run' ? 1 : 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        var cr = game.index.getFromIndex('icon_stance_crouch', 'hud_elements');
        var wa = game.index.getFromIndex('icon_stance_walk', 'hud_elements');
        var ru = game.index.getFromIndex('icon_stance_run', 'hud_elements');
        cr.alpha = 0.25;
        wa.alpha = 0.25;
        ru.alpha = 1;
      });
      pane.addChild(icon);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'HUD Run Types'
  };
  _BLUEPRINTS.COMPONENTS.container_inventory = {
    "getElement": function (container) {
      if (!container || !container.id) {
        container = new ComplexItem('ss_container5');
        container.onCreate();
      }
      indexName = 'container_inventory';
      indexKey = 'container' + container.id;
      if (container == undefined) {
        return false;
      }
      if (game.index.isInIndex(indexName, indexKey)) {
        lastContainer = game.index.getFromIndex(indexKey, indexName);
        lastContainer.invUI.destroy();
        game.index.removeFromIndex(indexName, indexKey, false);
      }
      game.index.addToIndex(indexName, container, indexKey);
      var inv = game.inventories.displayInventory('CONTAINER', container.inventory, container.id);
      container.invUI = inv;
      return inv;
    },
    "parent": 'component_huds',
    "name": 'Container inventory'
  };
  _BLUEPRINTS.COMPONENTS.game_dialog_window = {
    "getElement": function (ops) {
      if (!ops) {
        ops = {
          dialog: _BLUEPRINTS.DIALOGS['dialog_recruit_npc'],
          options: {
            callerObject: new LifeObject({
              dialog: 'dialog_recruit_npc'
            }),
            moveable: true
          }
        };
      }
      var dialog = ops.dialog;
      var options = ops.options;
      var xOffset = 35;
      var yOffset = 60;
      var w = 700;
      var h = 320;
      var x = game.ui._VIEWPORT_RIGHT / 2 - w / 2;
      var y = game.ui._VIEWPORT_BOTTOM / 2 - h / 2;
      var pane = game.render.componentRaw('drawBoxPane', {
        moveable: options.moveable,
        name: 'test',
        callerObject: options.callerObject,
        title: 'Dialog',
        x: 0,
        y: 0,
        w: w,
        h: h
      });
      pane.x = x;
      pane.y = y;
      var picContainer = new UIPane();
      picContainer.width = 128;
      picContainer.height = 128;
      picContainer.y += yOffset - 20;
      picContainer.x = 25;
      picContainer.alpha = 0.3;
      pane.addChild(picContainer);
      let padding = 10;
      var liltainer = new UIPane();
      liltainer.width = picContainer.width - padding;
      liltainer.height = picContainer.width - padding;
      liltainer.y = picContainer.y + padding / 2;
      liltainer.x = picContainer.x + padding / 2;
      liltainer.alpha = 0.3;
      pane.addChild(liltainer);
      var npcPic = options.callerObject.cloneForUI(options.dir);
      pane.addChild(npcPic);
      let picOffsetX = options.picOffsetX || 0;
      let picOffsetY = options.picOffsetY || 0;
      npcPic.x = xOffset + picOffsetX;
      npcPic.y = yOffset - 5 + picOffsetY;
      let scale = options.scale || 1;
      npcPic.scale.set(scale);
      xOffset += 155;
      var finalY = 0;
      let npcName = npcPic.data.name || 'Citizen';
      const name = game.render.text(npcName, 'ingame-menu-title');
      pane.addChild(name);
      name.x = picContainer.x + 5;
      name.y = picContainer.y + picContainer.height + 15;
      name.anchor.set(0.5);
      name.x = picContainer.x + picContainer.width / 2;
      lblName = game.render.text('' + dialog.dialog + '', 'dialog-main');
      pane.addChild(lblName);
      lblName.x = xOffset;
      lblName.y = yOffset - 20;
      opt1 = game.render.text('1. ' + dialog.option1, 'dialog-main');
      pane.addChild(opt1);
      opt1.pane = pane;
      opt1.x = xOffset;
      opt1.y = lblName.y + 120;
      opt1.origX = opt1.x;
      opt1.isInteractive();
      opt1.options = options;
      opt1.pic = npcPic;
      opt1.dialogObject = dialog;
      opt1.runFunc = dialog.option1_func;
      opt1.dialog = options.dialog;
      opt1.callerObject = options.callerObject;
      finalY = opt1.y;
      opt1.on('pointerover', function () {
        this.x += 5;
      });
      opt1.on('pointerout', function () {
        this.x = this.origX;
      });
      opt1.on('pointerup', function () {
        this.pic.destroy();
        this.pane.destroy();
        var response = this.dialogObject.option1_func(this.callerObject, game.p);
        if (typeof response == "string") {
          var goBack = function () {
            game.render.component('game_dialog', {
              dialog: this.callerDialog,
              callerObject: this.callerObject
            }, 'game_dialog');
          };
          game.render.component('game_dialog_window', {
            dialog: {
              dialog: response,
              callerObject: this.callerObject,
              callerDialog: this.dialog,
              option1: 'Go back',
              option1_func: goBack
            },
            options: this.options
          }, 'game_dialog');
        }
      });
      if (dialog.option2) {
        opt2 = game.render.text('2. ' + dialog.option2, 'dialog-main');
        pane.addChild(opt2);
        opt2.x = xOffset;
        opt2.y = opt1.y + 30;
        opt2.pic = npcPic;
        finalY = opt2.y;
        opt2.callerObject = options.callerObject;
        opt2.origX = opt1.x;
        opt2.isInteractive();
        opt2.pane = pane;
        opt2.options = options;
        opt2.dialogObject = dialog;
        opt2.runFunc = dialog.option1_func;
        opt2.dialog = options.dialog;
        opt2.on('pointerover', function () {
          this.x += 5;
        });
        opt2.on('pointerout', function () {
          this.x = this.origX;
        });
        opt2.on('pointerup', function () {
          this.pic.destroy();
          this.pane.destroy();
          var response = this.dialogObject.option2_func(this.callerObject, game.p);
          if (typeof response == "string") {
            var goBack = function () {
              game.render.component('game_dialog', {
                dialog: this.callerDialog,
                callerObject: this.callerObject
              }, 'game_dialog');
            };
            game.render.component('game_dialog_window', {
              dialog: {
                dialog: response,
                callerObject: this.callerObject,
                callerDialog: this.dialog,
                option1: 'Go back',
                option1_func: goBack
              },
              options: this.options
            }, 'game_dialog');
          }
        });
      }
      if (dialog.option3) {
        opt3 = game.render.text('3. ' + dialog.option3, 'dialog-main');
        pane.addChild(opt3);
        opt3.x = xOffset;
        opt3.y = opt2.y + 30;
        opt3.callerObject = options.callerObject;
        opt3.origX = opt1.x;
        opt3.pic = npcPic;
        finalY = opt3.y;
        opt3.isInteractive();
        opt3.pane = pane;
        opt3.options = options;
        opt3.dialogObject = dialog;
        opt3.runFunc = dialog.option1_func;
        opt3.dialog = options.dialog;
        opt3.on('pointerover', function () {
          this.x += 5;
        });
        opt3.on('pointerout', function () {
          this.x = this.origX;
        });
        opt3.on('pointerup', function () {
          this.pic.destroy();
          this.pane.destroy();
          var response = this.dialogObject.option3_func(this.callerObject, game.p);
          if (typeof response == "string") {
            var goBack = function () {
              game.render.component('game_dialog', {
                dialog: this.callerDialog,
                callerObject: this.callerObject
              }, 'game_dialog');
            };
            game.render.component('game_dialog_window', {
              dialog: {
                dialog: response,
                callerObject: this.callerObject,
                callerDialog: this.dialog,
                option1: 'Go back',
                option1_func: goBack
              },
              options: this.options
            }, 'game_dialog');
          }
        });
      }
      opt3 = game.render.text('X. Leave', 'item-gold');
      opt3.x = xOffset;
      opt3.y = finalY + 30;
      opt3.callerObject = options.callerObject;
      opt3.origX = opt1.x;
      opt3.pic = npcPic;
      opt3.isInteractive();
      opt3.pane = pane;
      opt3.options = options;
      opt3.dialogObject = dialog;
      opt3.runFunc = dialog.option1_func;
      opt3.dialog = options.dialog;
      opt3.on('pointerover', function () {
        this.x += 5;
      });
      opt3.on('pointerout', function () {
        this.x = this.origX;
      });
      opt3.on('pointerup', function () {
        this.pic.destroy();
        this.pane.destroy();
      });
      if (!options.cantClose) {
        pane.addChild(opt3);
      }
      game.render.aboveAll.addChild(pane);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Dialog Window'
  };
  _BLUEPRINTS.COMPONENTS.game_dialog = {
    "getElement": function (options) {
      if (!options) {
        options = {
          dialog: 'dialog_recruit_npc',
          callerObject: new LifeObject()
        };
      }
      var dialog = _BLUEPRINTS.DIALOGS[options.dialog];
      return game.render.component('game_dialog_window', {
        dialog: dialog,
        options: options
      }, 'game_dialog');
    },
    "parent": 'component_huds',
    "name": 'Game Dialog'
  };
  _BLUEPRINTS.COMPONENTS.context_menu = {
    "getElement": function (options) {
      game.ui.contextMenuShowing = true;
      if (!options) {
        options = {
          links: {
            "None": function () {}
          },
          callerObject: new LifeObject()
        };
      }
      let rowCount = Object.keys(options.links).length;
      const pane = game.render.componentRaw('component_container_slim', {
        x: 0,
        y: 0,
        w: 200,
        h: 38 * rowCount
      });
      let yOffset = 0;
      let xOffset = 0;
      for (let linkName in options.links) {
        let longName = linkName;
        linkName = linkName.length >= 15 ? linkName.substr(0, 15) + "..." : linkName;
        const linkBtn = game.render.componentRaw('hud_button', {
          name: linkName,
          x: 0,
          y: 0,
          w: 200,
          h: 40
        });
        linkBtn.isInteractive();
        linkBtn.callerObject = options.callerObject;
        linkBtn.callerFunction = options.links[longName];
        linkBtn.on('pointerdown', function () {
          if (typeof this.callerFunction == 'function') {
            this.callerFunction(this.callerObject);
          } else {}
        });
        linkBtn.on('pointerover', function () {
          this.alpha = 0.8;
        });
        linkBtn.on('pointerout', function () {
          this.alpha = 1;
        });
        linkBtn.x = xOffset;
        linkBtn.y = yOffset;
        pane.addChild(linkBtn);
        yOffset += 35;
      }
      game.index.addToIndex('context_menus', pane);
      pane.x = options.callerObject.x + 64;
      pane.y = options.callerObject.y + 64;
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Context Menu'
  };
  _BLUEPRINTS.COMPONENTS.settings_dialog = {
    "getElement": function (options) {
      if (!options) {
        options = {
          settings: ['none'],
          callerObject: new LifeObject()
        };
      }
      let rows = Object.keys(options.settings).length;
      let w = 500;
      let pane = game.render.componentRaw('drawBoxPane', {
        moveable: true,
        showX: true,
        name: 'test',
        callerObject: options.callerObject,
        title: 'Settings',
        x: 10,
        y: 10,
        w: w,
        h: 500
      });
      let pageItems = [];
      for (let i = 0; i < options.settings.length; i++) {
        let pageItem = new UIContainer();
        pageItems.push(pageItem);
        let settingName = options.settings[i];
        let settingValue = options.callerObject[settingName];
        if (options.callerObject.data && options.callerObject.data[settingName]) {
          settingValue = options.callerObject.data[settingName];
        }
        const callerObject = options.callerObject;
        let label = game.render.componentRaw("editableLabel", {
          showX: true,
          name: settingName,
          value: settingValue,
          callerObject: options.callerObject,
          title: "Settings",
          x: 0,
          y: 0,
          w: w - 50,
          h: 50,
          onChange: newValue => {
            if (newValue === 'true') {
              newValue = true;
            }
            if (newValue === 'false') {
              newValue = false;
            }
            if (callerObject.data[settingName]) {
              callerObject.data[settingName] = newValue;
            } else {
              if (callerObject[settingName]) {
                callerObject[settingName] = newValue;
              } else {
                callerObject.data[settingName] = newValue;
              }
            }
          }
        });
        pageItem.addChild(label);
      }
      let pager = game.render.componentRaw('pager', {
        items: pageItems,
        height: 350,
        width: 450
      });
      pager.x = 35;
      pager.y = 100;
      pane.addChild(pager);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Settings Dialog'
  };
  _BLUEPRINTS.COMPONENTS.component_listtools = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          tools: game.world.objectTemplates.walls
        };
      }
      game.ui.pinningTool = {
        reset: function () {},
        clickFunction: function () {}
      };
      let container = game.render.component('drawBoxPane', {
        showX: true,
        w: 500,
        h: 500
      });
      let tools = options.tools;
      let pageItems = [];
      for (let key in tools) {
        let tool = tools[key];
        let icon = {};
        if (game.editMode) {}
        if (tool.sprite) {
          icon = new ItemIcon(tool.sprite);
        } else {
          icon = new WorldObject(0, 0, game.render.newTexture(game.render.tilesets.background, (tool.across - 1) * 64, (tool.down - 1) * 64, 64, 64));
        }
        let toolContainer = new UIContainer();
        let recipeName = tool.codename;
        let recipe = _BLUEPRINTS.RECIPES['recipe_' + recipeName];
        if (!recipe) {
          recipe = _BLUEPRINTS.RECIPES['recipe_' + tool.recipe];
        }
        if (recipe) {
          holder = game.render.component('component_blueprint', {
            name: recipeName,
            recipe: recipe
          });
          holder.recipe = recipe;
          holder.recipeName = recipeName;
          holder.alpha = 0;
          let invItem = new ComplexItem(recipe.crafts);
          game.inventories.attachHoverFunctions(holder, invItem, true);
          toolContainer.addChild(holder);
        }
        toolContainer.addChild(icon);
        let label = game.render.text(tool.readName.split('').splice(0, Math.min(tool.readName.length, 13)).join(''), 'item-desc-small');
        label.scale.set(0.75);
        label.y = icon.height + 15;
        label.x = icon.width / 2;
        label.anchor.set(0.5);
        toolContainer.addChild(label);
        toolContainer.isInteractive();
        toolContainer.tool = tool;
        toolContainer.on('pointerup', function () {
          let toolType = this.tool.toolName || this.tool.codename;
          switch (toolType) {
            case 'godfurni':
              game.tools.newBuildWallTool(this.tool);
              break;
            case 'playersquaring':
              game.tools.newBuildWallTool(this.tool);
              break;
            case 'floor':
              game.tools.newBuildWallTool(this.tool);
              break;
            default:
              game.util.placeObject(this.tool);
              break;
          }
        });
        pageItems.push(toolContainer);
      }
      let pager = game.render.component('pager', {
        itemsPerPage: 4 * 4,
        template: 'pagergrid',
        items: pageItems,
        width: container.width - 55,
        height: container.height + 500,
        gap: 25
      });
      pager.x = 20;
      pager.y = 20;
      container.addChild(pager);
      let toggles = game.render.component('component_le_menutoggles', {});
      container.addChild(toggles);
      toggles.y = container.height;
      return container;
    },
    "parent": 'component_huds',
    "name": 'Tools list'
  };
  _BLUEPRINTS.COMPONENTS.component_menutools = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function () {
      let newButton = (text, callback) => {
        let container = game.render.component('drawBoxPane', {
          showX: false,
          w: 120,
          h: 64
        });
        let label = game.render.text(text, 'ingame-label');
        label.anchor.set(0.5);
        label.x = container.width / 2;
        label.y = container.height / 2;
        container.addChild(label);
        return container;
      };
      let container = game.render.component('drawBoxPane', {
        showX: false,
        w: 64,
        h: 64
      });
      let lastX = 0;
      for (let menu of game.ui.data.menus) {
        let btn = newButton(menu.readName, function () {});
        btn.x = lastX;
        lastX = btn.x + btn.width;
        container.addChild(btn);
        btn.isInteractive();
        btn.menu = menu;
        btn.on('pointerup', function () {
          if (this.menu.name == 'survival') {
            let tools = [];
            let knownRecipes = game.session.getUnlockedRecipes('build');
            for (let i = 0; i < knownRecipes.length; i++) {
              let recipe = game.session.getRecipe(knownRecipes[i]);
              let complex = game.itemTable.worldItems[recipe.crafts] ? true : false;
              tools.push({
                name: recipe.name,
                readName: recipe.name,
                description: recipe.description || '',
                recipe: knownRecipes[i],
                crafts: recipe.crafts,
                complex: complex,
                sprite: recipe.sprite,
                toolName: 'godfurni'
              });
            }
            this.menu.tools = tools;
          }
          game.util.destroyPlaceObject();
          if (this.menu.name == 'goBack') {
            game.unsetBuildMode();
            return;
          }
          game.render.aboveAll.addChild(game.render.component('component_listtools', {
            tools: this.menu.tools,
            editMode: game.editMode
          }, 'list-tools')).position = {
            y: container.y + container.height,
            x: container.x
          };
        });
      }
      ;
      return container;
    },
    "parent": 'component_huds',
    "name": 'Tools Menu'
  };
  _BLUEPRINTS.COMPONENTS.component_le_menutoggles = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function () {
      var pane = game.render.componentRaw('drawBoxPane', {
        showX: false,
        x: 0,
        y: 0,
        w: 225,
        h: 60
      });
      let padding = 20;
      game.buildTools.stopCircle();
      game.circleMode = false;
      game.fillMode = false;
      game.toolMode = "square";
      var btn = 'btn_linedsquare';
      var icon = new Sprite(btn);
      icon.id = btn;
      game.index.addToIndex('level_editor_toggles', icon);
      icon.setScale(0.5);
      icon.x = padding;
      icon.y = 15;
      icon.alpha = 1;
      icon.isInteractive();
      icon.on('pointerup', function () {
        game.index.modifyAllInIndex('level_editor_toggles', {
          alpha: 0.25
        });
        this.alpha = 1;
        game.levelEditorButtonMode = this.id.replace(/btn_/, '');
        game.buildTools.stopCircle();
        game.circleMode = false;
        game.fillMode = false;
        game.toolMode = "square";
      });
      pane.addChild(icon);
      var btn = 'btn_square';
      var icon = new Sprite(btn);
      icon.id = btn;
      game.index.addToIndex('level_editor_toggles', icon);
      icon.setScale(0.5);
      icon.x = padding + icon.width;
      icon.y = 15;
      icon.alpha = 0.25;
      icon.isInteractive();
      icon.on('pointerup', function () {
        game.index.modifyAllInIndex('level_editor_toggles', {
          alpha: 0.25
        });
        this.alpha = 1;
        game.levelEditorButtonMode = this.id.replace(/btn_/, '');
        game.buildTools.stopCircle();
        game.circleMode = false;
        game.fillMode = true;
        game.toolMode = "square";
      });
      pane.addChild(icon);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Level Editor Toggles'
  };
  _BLUEPRINTS.COMPONENTS.component_lockpick_ui = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          unUnlock: function () {
            game.notify("UNLOCKED!");
          },
          onBroken: function () {
            game.notify("PICK BROKEN!!");
          }
        };
      }
      function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }
      const debug = 0;
      var pane = new UIPane();
      let mouseDown = false;
      pane.isInteractive();
      pane.on("pointerdown", () => {
        mouseDown = true;
      });
      pane.on("pointerup", () => {
        broken = false;
        mouseDown = false;
      });
      const lockSize = {
        start: 310,
        end: 50
      };
      const lockPos = {
        start: 0,
        end: 0
      };
      const diff = {
        easy: 75,
        medium: 50,
        hard: 25,
        nightmare: 10
      };
      lockPos.start = game.rng(70, 290);
      lockPos.end = lockPos.start + diff["nightmare"];
      let circleData = {
        rad: 150,
        startAngle: 310,
        endAngle: 50
      };
      const circ = function (data) {
        let circle = new PIXI.Graphics();
        circle.beginFill(data.fill || 0xffffff);
        circle.drawCircle(0, 0, data.rad);
        circle.endFill();
        return circle;
      };
      let circle = circ(circleData);
      pane.addChild(circle);
      circle.x = pane.width / 4;
      circle.y = pane.height / 4;
      let startNode = circ({
        rad: 10,
        fill: 0xff9922
      });
      pane.addChild(startNode);
      startNode.x = circle.x + circleData.rad * Math.sin(degreesToRadians(lockSize.start));
      startNode.y = circle.y + circleData.rad * Math.cos(degreesToRadians(lockSize.start));
      let endNode = circ({
        rad: 10,
        fill: 0x114477
      });
      pane.addChild(endNode);
      endNode.x = circle.x + circleData.rad * Math.sin(degreesToRadians(lockSize.end));
      endNode.y = circle.y + circleData.rad * Math.cos(degreesToRadians(lockSize.end));
      let lockPosStartNode = circ({
        rad: 10,
        fill: 0x0000ff
      });
      pane.addChild(lockPosStartNode);
      lockPosStartNode.x = circle.x + circleData.rad * Math.sin(degreesToRadians(lockPos.start));
      lockPosStartNode.y = circle.y + circleData.rad * Math.cos(degreesToRadians(lockPos.start));
      let lockPosEndNode = circ({
        rad: 10,
        fill: 0xff0000
      });
      pane.addChild(lockPosEndNode);
      lockPosEndNode.x = circle.x + circleData.rad * Math.sin(degreesToRadians(lockPos.end));
      lockPosEndNode.y = circle.y + circleData.rad * Math.cos(degreesToRadians(lockPos.end));
      let pickerNode = circ({
        rad: 10,
        fill: 0xccffbb
      });
      pane.addChild(pickerNode);
      pickerNode.x = circle.x + circleData.rad * Math.sin(0);
      pickerNode.y = circle.y + circleData.rad * Math.cos(0);
      clearTimeout(window.lockPickTicker);
      let lockHolder = new Sprite("sprite_lock_holder");
      lockHolder.x = circle.x + 110;
      lockHolder.y = circle.y;
      pane.addChild(lockHolder);
      lockHolder.setAnchor(0.5);
      let lock = new Sprite("sprite_lock");
      lock.x = circle.x;
      lock.y = circle.y;
      pane.addChild(lock);
      lock.setAnchor(0.5);
      let lockPicker = new Sprite("sprite_lockpicker");
      lockPicker.x = circle.x;
      lockPicker.y = circle.y;
      pane.addChild(lockPicker);
      lockPicker.anchor.set(0.5, 1);
      let origX = lock.x;
      let broken = false;
      circle.alpha = debug;
      lockPosEndNode.alpha = debug;
      lockPosStartNode.alpha = debug;
      startNode.alpha = debug;
      endNode.alpha = debug;
      const lockTurn = angle => {
        const canUnlock = angle > lockPos.start && angle < lockPos.end;
        const SHAKE_ANGLE = 25;
        const SHAKE_BREAK = SHAKE_ANGLE + 35;
        if (!canUnlock && lock.angle > SHAKE_ANGLE) {
          lock.x = origX + game.rng(-3, 3);
        }
        if (!canUnlock && lock.angle > SHAKE_BREAK) {
          lockReset();
          lockBroken();
          return;
        }
        if (canUnlock && lock.angle > 160) {
          lockUnlocked();
          return;
        }
        lock.angle++;
      };
      let unlock = new Sprite("sprite_lock_unlocked");
      unlock.x = circle.x;
      unlock.y = circle.y;
      unlock.alpha = 0;
      pane.addChild(unlock);
      unlock.setAnchor(0.5);
      const lockUnlocked = () => {
        unlock.angle = lock.angle;
        unlock.alpha = 1;
        if (typeof options.onUnlock == "function") {
          options.unUnlock.call(options);
        }
        return;
      };
      const lockBroken = () => {
        broken = true;
        mouseDown = false;
        if (typeof options.onBroken == "function") {
          options.onBroken.call(options);
        }
        return;
      };
      const lockReset = () => {
        lock.x = origX;
        unlock.alpha = 0;
      };
      const timer = () => {
        if (!lockPicker) {
          return;
        }
        window.lockPickTicker = setTimeout(timer, 10);
        if (broken) {}
        let mouseX = game.screenMouseX;
        let start = 0;
        let end = pane.width / 2;
        let percent = end / 100;
        percent = mouseX / percent;
        let angle = 360 * (percent / 100);
        if (mouseDown) {
          lockTurn(angle);
          return;
        }
        if (lock.angle > 0) {
          lock.angle--;
        }
        lockReset();
        if (angle < lockSize.end) {
          angle = lockSize.end;
        }
        if (angle > lockSize.start) {
          angle = lockSize.start;
        }
        pickerNode.x = circle.x + circleData.rad * Math.sin(degreesToRadians(angle));
        pickerNode.y = circle.y + circleData.rad * Math.cos(degreesToRadians(angle));
        lockPicker.angle = 180 + -angle;
      };
      timer();
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Lock Pick'
  };
  _BLUEPRINTS.COMPONENTS.hud_player_card_right = {
    "options": 'player',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.player = game.watching || new LifeObject();
      var w = 500;
      var h = 225;
      var statsXOffset = 235;
      var buttonsXOffset = 5;
      var statsYOffset = 180;
      var statSpace = 25;
      let player = options.player;
      const SLEEP_TIMEOUT = 1000;
      var offsetX = 20;
      var offsetY = 15;
      var hasPlayer = true;
      var pane = game.render.componentRaw('drawBoxPane', {
        showX: game.editMode,
        name: 'test',
        callerObject: options.player,
        x: 0,
        y: 0,
        w: w,
        h: h
      });
      let statusList = player.getStatuses();
      function statusIcon(status, timeLeft) {
        let icon = _BLUEPRINTS._STATUSES['c_effect_' + status].sprite;
        if (!icon) {
          icon = 'icon_stance_walk';
        }
        let pane = new UIPane({
          w: 32,
          h: 32
        });
        pane.addChild(new ItemIcon(icon, {
          w: 32,
          h: 32
        }));
        if (!timeLeft || timeLeft < 0) {
          return pane;
        }
        timeLeft = Math.floor(timeLeft / 1000) + "s";
        let time = game.render.text(timeLeft, 'item-name-1');
        time.scale.set(0.8);
        time.anchor.set(0.5);
        time.x = pane.width / 2;
        time.y = pane.height + 10;
        pane.addChild(time);
        return pane;
      }
      let startX = 36;
      let startY = 16;
      let spacer = 36;
      for (let statusID in statusList) {
        let status = statusList[statusID];
        let endTime = status.startTime + status.options.duration;
        let timeLeft = endTime - game.ts;
        let icon = statusIcon(status.status, timeLeft);
        icon.x = startX;
        icon.y = startY;
        startX += icon.width + spacer;
        pane.addChild(icon);
      }
      var hudButton = game.render.componentRaw('hud_button', {
        name: 'Build',
        w: 130
      });
      hudButton.x = buttonsXOffset;
      hudButton.y = statsYOffset;
      buttonsXOffset += hudButton.width;
      pane.addChild(hudButton);
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {
        game.setBuildMode();
      });
      var hudButton = game.render.componentRaw('hud_button', {
        name: 'Research',
        w: 120
      });
      hudButton.x = buttonsXOffset;
      hudButton.y = statsYOffset;
      buttonsXOffset += hudButton.width;
      pane.addChild(hudButton);
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {
        var hud_researchmenu = game.render.component('hud_researchmenu', false, 'hud_researchmenu');
        hud_researchmenu.x = 20;
        hud_researchmenu.y = 20;
        game.render.aboveAll.addChild(hud_researchmenu);
      });
      var hudButton = game.render.componentRaw('hud_button', {
        name: ' ',
        w: 120
      });
      hudButton.x = buttonsXOffset;
      hudButton.y = statsYOffset;
      buttonsXOffset += hudButton.width;
      pane.addChild(hudButton);
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {});
      var hudButton = game.render.componentRaw('hud_button', {
        name: 'Menu',
        w: 120
      });
      hudButton.x = buttonsXOffset;
      hudButton.y = statsYOffset;
      buttonsXOffset += hudButton.width;
      pane.addChild(hudButton);
      pane.noClickThrough();
      hudButton.isInteractive();
      hudButton.on('pointerup', function () {
        game.render.aboveAll.addChild(game.render.component('frontMenu', {
          close: true
        }, 'frontMenu'));
      });
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Player right card'
  };
  _BLUEPRINTS.COMPONENTS.hud_researchmenu = {
    "options": 'crafter',
    "getElement": function (options) {
      const RESEARCH_TREE_WIDTH = 280;
      function hasResearch(research) {
        return game.session.knowsRecipe(research.unlocks);
      }
      const crafter = options.crafter;
      const RESEARCH_TREE = _BLUEPRINTS.RESEARCH_NODES;
      const LINE_COLOR = 0x215a0f;
      const UNLOCKED = {};
      function addVirticalLine(stage, x, y) {
        const LINE_HEIGHT = 20;
        const LINE_WIDTH = 5;
        let line = new UIPane({
          fill: LINE_COLOR
        });
        line.width = LINE_WIDTH;
        line.height = LINE_HEIGHT;
        line.x = x;
        line.y = y;
        stage.addChild(line);
      }
      function addHorizontalLine(stage, x, y) {
        const LINE_HEIGHT = 5;
        const LINE_WIDTH = 20;
        let line = new UIPane({
          fill: LINE_COLOR
        });
        line.width = LINE_WIDTH;
        line.height = LINE_HEIGHT;
        line.x = x;
        line.y = y;
        stage.addChild(line);
      }
      function unlockResearch(research) {
        let parent = research.parent;
        let knowsParent = true;
        let parentRecipe = null;
        if (parent) {
          let parentCleanName = research.parent.substring(2);
          knowsParent = game.session.knowsRecipe("recipe_" + parentCleanName);
          parentRecipe = game.session.getRecipe("recipe_" + parentCleanName);
        }
        if (!knowsParent) {
          game.notify(`Must learn '${parentRecipe.name}' research first!`);
          return;
        }
        game.confirm(`Are you sure you want to unlock ${research.name}?`, () => {
          if (crafter && crafter.inventory && game.session.removeCraftRecipe(research, crafter.inventory)) {
            game.session.unlockRecipe(research.unlocks);
            research.icon.alpha = 1;
          } else {
            game.notify("Please visit a research bench`n with the necessary resources!");
          }
        });
      }
      function addResearch(stage, research, index) {
        const WIDTH = RESEARCH_TREE_WIDTH;
        const HEIGHT = 800;
        let container = new UIContainer();
        container.x = index * WIDTH;
        stage.addChild(container);
        let background = new UIPane({
          fill: 0x449952
        });
        background.width = WIDTH - 5;
        background.height = HEIGHT;
        background.x = -10;
        background.y = -10;
        background.alpha = 0.5;
        container.addChild(background);
        newBackground = new UIPane({
          fill: 0x000000
        });
        newBackground.width = background.width - 20;
        newBackground.height = background.height - 30;
        newBackground.alpha = 0.5;
        container.addChild(newBackground);
        const contentContainer = new UIContainer();
        contentContainer.x = 10;
        contentContainer.y = 10;
        container.addChild(contentContainer);
        let icon = new ItemIcon(research.sprite, {
          noBg: true
        });
        research.readName = research.name;
        game.inventories.attachHoverFunctions(icon, {
          codename: research.sprite,
          amount: research.amount,
          require: research.require,
          readName: research.name,
          data: {},
          meta: {}
        }, true);
        let researchContainer = new UIContainer();
        researchContainer.y = 140;
        icon.y = researchContainer.y - 80;
        contentContainer.addChild(researchContainer);
        let text = game.render.text(research.name, 'ingame-menu-title');
        text.scale.set(1.2);
        text.x = 10;
        text.y = 0;
        contentContainer.addChild(text);
        let splitter = new UIPane({
          fill: 0x449952
        });
        splitter.width = WIDTH - 25;
        splitter.height = 10;
        splitter.x = text.x - 10;
        splitter.y = text.y + 50;
        splitter.alpha = 0.5;
        container.addChild(splitter);
        let iconBg = new UIPane({
          fill: 0x115010
        });
        iconBg.x = icon.x;
        iconBg.y = icon.y;
        iconBg.width = 64;
        iconBg.height = 64;
        iconBg.alpha = icon.alpha;
        contentContainer.addChild(iconBg);
        let iconBg2 = new UIPane({
          fill: 0x0a3c0a
        });
        iconBg2.x = icon.x + 2;
        iconBg2.y = icon.y + 2;
        iconBg2.width = 60;
        iconBg2.height = 60;
        iconBg2.alpha = icon.alpha;
        contentContainer.addChild(iconBg2);
        contentContainer.addChild(icon);
        if (research.children) {
          researchContainer.codename = research.codename;
          processChildResearch(researchContainer, research.children);
        }
      }
      function addChildResearch(stage, research, index) {
        let hasParent = false;
        const GAP = 80;
        let container = new UIContainer();
        container.y = index * GAP;
        stage.addChild(container);
        container.codename = research.parent;
        stage[research.codename] = container;
        let icon = new ItemIcon(research.sprite, {
          noBg: true
        });
        if (research.parent) {
          let parent = stage[research.parent];
          if (parent) {
            container.x = parent.x + GAP;
            container.y = parent.y;
            hasParent = true;
          }
        }
        let meta = {};
        let data = {};
        let recipe = {
          amount: false,
          require: false
        };
        let showCraftingCost = false;
        recipe = game.session.getRecipe(research.unlocks);
        if (stage.codename == "armor" || stage.codename == "weapons" || stage.codename == "survival") {
          let itemClone = new InventoryItem(recipe.crafts);
          meta = itemClone.meta;
          data = itemClone.data;
        }
        const itemDescriber = {
          showResearchCost: true,
          showCraftingCost: true,
          codename: research.codename,
          amount: recipe.amount,
          require: recipe.require,
          researchAmount: research.amount,
          researchRequire: research.require,
          readName: research.name,
          data: data,
          meta: meta
        };
        game.inventories.attachHoverFunctions(icon, itemDescriber, true);
        if (hasParent) {
          addHorizontalLine(container, -16, 32);
        } else {
          addVirticalLine(container, 32, -16);
        }
        icon.isInteractive();
        if (!hasResearch(research)) {
          icon.alpha = 0.5;
          icon.on('pointerup', () => {
            if (!hasResearch(research)) {
              unlockResearch(research);
            }
          });
        }
        research.icon = icon;
        let iconBg = new UIPane({
          fill: 0x115010
        });
        iconBg.width = 64;
        iconBg.height = 64;
        iconBg.alpha = icon.alpha;
        container.addChild(iconBg);
        let iconBg2 = new UIPane({
          fill: 0x0a3c0a
        });
        iconBg2.x = 2;
        iconBg2.y = 2;
        iconBg2.width = 60;
        iconBg2.height = 60;
        iconBg2.alpha = icon.alpha;
        container.addChild(iconBg2);
        container.addChild(icon);
      }
      function processChildResearch(stage, nodes) {
        let offset = 0;
        for (let i = 0; i < nodes.length; i++) {
          if (nodes[i].parent) {
            addChildResearch(stage, nodes[i], offset);
          } else {
            addChildResearch(stage, nodes[i], offset);
            offset++;
          }
        }
      }
      function processResearch(stage, tree) {
        let keys = Object.keys(tree);
        for (let i = 0; i < keys.length; i++) {
          addResearch(stage, tree[keys[i]], i);
        }
      }
      const w = Object.keys(RESEARCH_TREE).length * RESEARCH_TREE_WIDTH + 10;
      const h = 815;
      const stage = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: true,
        showX: true,
        w: w,
        h: h
      });
      const container = new UIContainer();
      container.x = 15;
      container.y = 15;
      stage.addChild(container);
      processResearch(container, RESEARCH_TREE);
      const infoLeft = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: true,
        showX: false,
        w: w / 2,
        h: 100
      });
      infoLeft.y = stage.height;
      stage.addChild(infoLeft);
      let info1 = game.render.text("Remember!`nYou must insert research resources into the research bench `nbefore researching`n");
      info1.x = 20;
      info1.y = 20;
      info1.alpha = 0.6;
      infoLeft.addChild(info1);
      const infoRight = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: true,
        showX: false,
        w: w / 2,
        h: 100
      });
      infoRight.x = infoRight.width;
      infoRight.y = infoLeft.y;
      stage.addChild(infoRight);
      let info2 = game.render.text("Did you know?`nYou can buy or find more research blueprints which are not`nshown in this list");
      info2.x = 20;
      info2.y = 20;
      info2.alpha = 0.6;
      infoRight.addChild(info2);
      if (options.crafter && game.researchShowInv) {
        game.researchShowInv.destroy();
        game.researchShowInv = false;
      }
      if (options.crafter && !game.researchShowInv) {
        game.researchShowInv = crafter.showInventory();
        game.researchShowInv.x = stage.x + stage.width;
      }
      return stage;
    },
    "parent": 'component_huds',
    "name": 'Hud Research Menu'
  };
  _BLUEPRINTS.COMPONENTS.component_confirm = {
    "options": 'text, confirmText, cancelText, title, onConfirm, onCancel',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let text = options.text || "Are you sure you want to do that?";
      let confirmText = options.confirmText || "Confirm";
      let cancelText = options.cancelText || "Cancel";
      let title = 'Important!' || options.title;
      let w = options.w || 400;
      let h = options.h || 190;
      const pane = game.render.componentRaw('drawBoxPane', {
        title: title,
        moveable: true,
        showX: false,
        w: w,
        h: h
      });
      text = game.render.text(text, 'longerwhitedesc');
      text.x = pane.width / 2;
      text.y = pane.height / 2 - 12;
      text.anchor.set(0.5, 1);
      pane.addChild(text);
      let btnHeight = pane.height - 10;
      let btnWidth = 120;
      btnWidth = w / 2 - 0;
      const confirmButton = game.render.componentRaw('hud_button', {
        name: confirmText,
        w: btnWidth
      });
      pane.addChild(confirmButton);
      confirmButton.isInteractive();
      confirmButton.owner = pane;
      confirmButton.x = pane.width - confirmButton.width - 5;
      confirmButton.y = h - confirmButton.height - 5;
      confirmButton.on('pointerup', () => {
        pane.destroy();
        if (typeof options.onConfirm == 'function') {
          options.onConfirm();
        }
      });
      const cancelButton = game.render.componentRaw('hud_button', {
        name: cancelText,
        w: btnWidth
      });
      pane.addChild(cancelButton);
      cancelButton.isInteractive();
      cancelButton.owner = pane;
      cancelButton.x = 5;
      cancelButton.y = h - cancelButton.height - 5;
      cancelButton.on('pointerup', () => {
        pane.destroy();
        if (typeof options.onCancel == 'function') {
          options.onCancel();
        }
      });
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Confirm Prompt'
  };
  _BLUEPRINTS.COMPONENTS.itemui_fulldescriptor = {
    "options": 'readName, data, meta, showCraftingCost, showResearchCost',
    "getElement": function (options) {
      if (this.descUI && typeof this.descUI.destroy == 'function') {
        this.descUI.destroy();
        delete this.descUI;
      }
      if (options == undefined) {
        options = JSON.parse(`{"showRecipe": true,"codename":"p_ss_weapon_shotty1","amount":"3,30,3,10,13","require":"adhesive,composites,nano_chip,mechscrap,darkiron","researchAmount":"20","researchRequire":"research_node","readName":"Advanced Shotgun","data":{"BASE_DMG":2,"LIFETIME":3,"SPEED":0.2,"BLEED_DURATION":10,"BLEED_CHANCE":10,"SPRITE":"projectile_simple","TYPE":"ballistic","stance":"none","stats":{"type":"ballistic","baseDmg":2,"speed":0.2,"range":3},"quality":1,"sellPrice":991,"buyPrice":2477,"value":1651,"rawWidth":59,"rawHeight":59},"meta":{"description":"A more modern version of the classic shotgun. It appears to be locked to certain DNA signatures, rendering it useless unless assigned to you.","weight":1,"contextOptions":"equipt","slots":"weapon","blockWidth":4,"blockHeight":2,"stance":"longgun","value":1500}}`);
        options = JSON.parse(`{"showResearchCost":true,"showCraftingCost":true,"codename":"p_ss_chembench","amount":"5,100,20","require":"adhesive,wood,composites","researchAmount":"15","researchRequire":"research_node","readName":"Crafting Chem Bench","data":{},"meta":{}}`);
      }
      options.showCraftingCost = typeof options.showCraftingCost === "undefined" ? false : options.showCraftingCost;
      options.showResearchCost = typeof options.showResearchCost === "undefined" ? false : options.showResearchCost;
      displayStat = function (name, label) {
        return {
          name: name,
          label: label
        };
      };
      let recipe = _BLUEPRINTS.RECIPES['recipe_pickaxe'];
      let name = options.readName || options.data.name || "Junk item";
      let desc = options.data.description || options.meta.description || false;
      let showResourceIcons = typeof options.showResourceIcons === "undefined" ? true : options.showResourceIcons;
      if (options.hideDesc) {
        desc = false;
      }
      let stats = options.data.stats || options.meta.stats || false;
      let recipeStatTable = {};
      let recipeStats = {};
      if (options.meta.recipe || options.showRecipe || options.showCraftingCost) {
        recipe = _BLUEPRINTS.RECIPES['recipe_' + options.meta.recipe];
        if (!recipe) {
          recipe = _BLUEPRINTS.RECIPES['recipe_' + options.codename];
        }
        if (!recipe) {
          recipe = options;
        }
        let needs = recipe.require.split(',');
        let amounts = recipe.amount.split(',');
        for (let i = 0; i < needs.length; i++) {
          recipeStats[needs[i]] = amounts[i];
          recipeStatTable[needs[i]] = displayStat(needs[i].charAt(0).toUpperCase() + needs[i].slice(1), 'v');
        }
      }
      let researchStatTable = {};
      let researchStats = {};
      if (options.researchAmount || options.showResearchRecipe) {
        recipe = _BLUEPRINTS.RECIPES['recipe_' + options.meta.recipe];
        if (!recipe) {
          recipe = _BLUEPRINTS.RECIPES['recipe_' + options.codename];
        }
        if (!recipe) {
          recipe = options;
        }
        let needs = recipe.researchRequire.split(',');
        let amounts = recipe.researchAmount.split(',');
        for (let i = 0; i < needs.length; i++) {
          researchStats[needs[i]] = amounts[i];
          researchStatTable[needs[i]] = displayStat(needs[i].charAt(0).toUpperCase() + needs[i].slice(1), 'v');
        }
      }
      if (stats !== false) {
        var width = options.oWidth || options.w || 450;
        var textWidth = 'small';
      } else {
        var width = options.oWidth || options.w || 500;
        var textWidth = 'wide';
      }
      const container = new UIContainer();
      let statsContainer = game.render.componentRaw('component_stat_table', {
        data: {
          stats: stats
        },
        meta: {
          stats: stats
        }
      });
      let researchContainer = new UIContainer();
      let offsetRecipe = statsContainer.y + statsContainer.height;
      if (options.showResearchCost) {
        offsetRecipe = 10;
        let researchTitle = game.render.text('Research cost', 'item-name-1');
        researchTitle.x = 0;
        researchTitle.y = 15;
        researchContainer.addChild(researchTitle);
        let researchRecipe = game.render.componentRaw('component_stat_table', {
          stats: researchStats,
          statTable: researchStatTable
        });
        researchRecipe.y = researchTitle.y + researchTitle.height + 15;
        researchContainer.addChild(researchRecipe);
        researchContainer.y = statsContainer.height;
        statsContainer.addChild(researchContainer);
      }
      let recipeContainer = new UIContainer();
      if (options.showCraftingCost || options.showRecipe) {
        let recipeTitle = game.render.text('Crafting cost', 'item-name-1');
        recipeTitle.x = 0;
        recipeTitle.y = 15;
        recipeContainer.addChild(recipeTitle);
        let recipeRecipe = game.render.componentRaw('component_stat_table', {
          stats: recipeStats,
          statTable: recipeStatTable
        });
        recipeRecipe.y = recipeTitle.y + recipeTitle.height + 15;
        recipeContainer.addChild(recipeRecipe);
        recipeContainer.y = offsetRecipe + researchContainer.y + researchContainer.height;
        statsContainer.addChild(recipeContainer);
      }
      statsContainer.x = 25;
      if (options.isQuantity) {
        if (options.resourceType) {
          if (desc && desc.length > 0) {
            desc = options.resourceType + "`n`n" + desc;
          } else {
            desc = options.resourceType;
          }
        } else {
          if (desc && desc.length > 0) {
            desc = "Crafting Resource\n\n" + desc;
          } else {
            desc = "Crafting Resource";
          }
        }
      }
      var lblDesc = game.render.mText(desc, 'item-desc-' + textWidth);
      descHeight = lblDesc.mHeight;
      if (!desc || !desc.length) {
        descHeight = -20;
      }
      descContainer = new UIContainer();
      if (desc && desc.length > 0) {
        descUI = game.render.component('component_container_slim', {
          w: width - 50,
          h: descHeight + 25
        });
        descContainer.addChild(descUI);
        descContainer.addChild(lblDesc);
        lblDesc.x = 10;
        lblDesc.y = 10;
      }
      if (options.meta.recipe || options.showRecipe) {
        lblName = game.render.text("Blueprint: " + name, 'item-name-1');
      } else {
        if (options.data.quality) {
          lblName = game.render.text(name, 'item-name-' + options.data.quality);
        } else {
          lblName = game.render.text(name, 'item-name-1');
        }
      }
      container.addChild(lblName);
      lblName.x = 25;
      lblName.y = 25;
      descContainer.x = 20;
      descContainer.y = 55;
      container.addChild(descContainer);
      statsContainer.y = descContainer.y + descContainer.height;
      container.addChild(statsContainer);
      const component = game.render.component('drawBoxPane', {
        w: width,
        h: 50 + container.height,
        showX: options.showX === false ? false : true
      });
      component.addChild(container);
      let qty = 1;
      if (options.isQuantity) {
        qty = options.data.qty;
      }
      let value = false;
      if (options.isShop) {
        value = game.render.component('moneyLabel', {
          value: options.data.buyPrice * qty
        });
      } else {
        if (options.data.sellPrice > 0) {
          value = game.render.component('moneyLabel', {
            value: options.data.sellPrice * qty
          });
        }
      }
      if (!options.noMoney && value) {
        component.addChild(value);
        value.y = 20;
        value.x = width - 130;
      }
      return component;
    },
    "parent": 'component_huds',
    "name": 'Item Description'
  };
  _BLUEPRINTS.COMPONENTS.hud_mods = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      let w = options.w || 800;
      let h = options.h || 500;
      const pane = game.render.componentRaw('drawBoxPane', {
        title: "Mods",
        moveable: true,
        showX: true,
        w: w,
        h: h
      });
      let modMenu = pane;
      const title = game.render.text("Disabled", "ingame-menu-title");
      title.x = 20;
      title.y = 30;
      pane.addChild(title);
      const title2 = game.render.text("Enabled", "ingame-menu-title");
      title2.x = w / 2;
      title2.y = 30;
      pane.addChild(title2);
      let mods = game.modManager.getDisabledMods();
      let modKeys = Object.keys(mods);
      let startY = 60;
      let offsetY = startY;
      h = 25;
      let gap = h + 5;
      w = w / 2;
      function addButton(name, enabled, order) {
        let pane = new UIContainer();
        let pane1 = new UIContainer();
        let pane2 = new UIContainer();
        let pane3 = new UIContainer();
        pane.addChild(pane1);
        pane.addChild(pane2);
        pane.addChild(pane3);
        let button = new UIPane();
        button.width = 25;
        button.height = 25;
        pane1.addChild(button);
        let icon = game.render.text(enabled ? "x" : ">");
        icon.x = 8;
        icon.y = 2;
        pane1.addChild(icon);
        pane1.isInteractive();
        pane1.on('pointerup', () => {
          if (enabled) {
            game.modManager.disableMod(name);
          } else {
            game.modManager.enableMod(name);
          }
          let x = modMenu.x;
          let y = modMenu.y;
          modMenu.destroy();
          let newHud = game.render.component('hud_mods', options, 'hud_mods');
          newHud.x = x;
          newHud.y = y;
          game.render.aboveAll.addChild(newHud);
        });
        if (!enabled) {
          return pane;
        }
        let upButton = new UIPane();
        upButton.width = 25;
        upButton.height = 25;
        pane2.x = pane1.width;
        pane2.addChild(upButton);
        let upButtonIcon = game.render.text("-");
        upButtonIcon.x = upButton.x + 8;
        upButtonIcon.y = 2;
        pane2.addChild(upButtonIcon);
        pane2.isInteractive();
        pane2.on('pointerup', () => {
          game.modManager.reorderMod(name, order - 1);
          let x = modMenu.x;
          let y = modMenu.y;
          modMenu.destroy();
          let newHud = game.render.component('hud_mods');
          newHud.x = x;
          newHud.y = y;
          game.render.aboveAll.addChild(newHud);
        });
        let downButton = new UIPane();
        downButton.width = 25;
        downButton.height = 25;
        pane3.x = pane1.width + pane2.width;
        pane3.addChild(downButton);
        let downButtonIcon = game.render.text("+");
        downButtonIcon.x = downButton.x + 8;
        downButtonIcon.y = 2;
        pane3.addChild(downButtonIcon);
        pane3.isInteractive();
        pane3.on('pointerup', () => {
          game.modManager.reorderMod(name, order + 1);
          let x = modMenu.x;
          let y = modMenu.y;
          modMenu.destroy();
          let newHud = game.render.component('hud_mods');
          newHud.x = x;
          newHud.y = y;
          game.render.aboveAll.addChild(newHud);
        });
        return pane;
      }
      function modHolder(mod, enabled) {
        let pane = new UIContainer();
        let holder = new UIPane();
        holder.alpha = 0.5;
        holder.width = w - 40;
        holder.height = 25;
        pane.addChild(holder);
        let title = game.render.text(mod.name + " v" + mod.version);
        title.scale.set(0.70);
        title.x = 5;
        title.y = 5;
        pane.addChild(title);
        let buttons = addButton(mod.codename, enabled, mod.order);
        buttons.x = holder.width - buttons.width;
        pane.addChild(buttons);
        return pane;
      }
      for (let i = 0; i < modKeys.length; i++) {
        let mod = mods[modKeys[i]];
        let holder = modHolder(mod, false);
        holder.x = 20;
        holder.y = offsetY;
        offsetY += gap;
        pane.addChild(holder);
      }
      offsetY = startY;
      mods = game.modManager.getEnabledMods();
      modKeys = Object.keys(mods);
      for (let i = 0; i < modKeys.length; i++) {
        let mod = mods[modKeys[i]];
        let holder = modHolder(mod, true);
        holder.x = w;
        holder.y = offsetY;
        offsetY += gap;
        pane.addChild(holder);
      }
      return pane;
    },
    "parent": 'component_huds',
    "name": 'HUD Show Mods'
  };
  _BLUEPRINTS.COMPONENTS.hud_basic_gamestart = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.w = options.w || 500;
      options.h = options.h || 500;
      const items = options.items || ['Human', 'Robot', 'Alien'];
      const bottomTexts = options.bottomTexts || ['Choose the Human option', 'Choose the Robot option', 'Choose the Alien option'];
      let currentIndex = 0;
      const optionCallbacks = {
        "Human": () => {}
      };
      game.ee.emit('get_newstart_items', items);
      game.ee.emit('get_newstart_text', bottomTexts);
      game.ee.emit('get_newstart_optioncallbacks', optionCallbacks);
      const parentContainer = options.parent || game.render.aboveAll;
      const pane = game.render.component('drawBoxPane', {
        x: options.x || 0,
        y: options.y || 0,
        w: options.w,
        h: options.h,
        title: options.title || 'New game',
        showX: true,
        onClose: options.onClose,
        moveable: true,
        corner: "telly"
      });
      const carouselContainer = new PIXI.Container();
      carouselContainer.x = 10;
      carouselContainer.y = 10;
      pane.addChild(carouselContainer);
      const carousel = game.render.component('component_text_carousel', {
        w: options.w - 50,
        h: options.h * 0.8 - 80,
        items: items,
        bottomTexts: bottomTexts
      });
      carousel.x = 15;
      carousel.y = 20;
      carouselContainer.addChild(carousel);
      carousel.on('change', (index, value) => {
        game.startType = value.toLowerCase();
        if (typeof optionCallbacks[value] === "function") {
          optionCallbacks[value]();
        }
      });
      const startButton = game.render.componentRaw('drawLoadFile', {
        slot: 'slot1',
        type: 'new',
        loadFile: {},
        w: 200,
        h: 50
      });
      startButton.x = options.w - 120;
      pane.addChild(startButton);
      const advancedButton = game.render.component('hud_button', {
        name: 'Advanced',
        w: 200,
        h: 40,
        fill: '0x3d3d3d',
        corner: true,
        onClick: () => {
          let ui = game.render.component('hud_new_game', {
            title: 'New Game',
            type: 'new'
          }, 'hud_new_game');
          parentContainer.addChild(ui);
          ui.x = 50;
          ui.y = 50;
        }
      });
      advancedButton.x = 30;
      advancedButton.y = options.h - advancedButton.height - 20 + 50;
      advancedButton.pane = pane;
      startButton.y = advancedButton.y - 20;
      pane.addChild(advancedButton);
      return pane;
    },
    "parent": 'component_huds',
    "name": 'Basic New Game Start'
  };
  _BLUEPRINTS.COMPONENTS.hud_world_state = {
    "getElement": function (options) {
      const factionTable = game.session.factions && Object.keys(game.session.factions.factionTable).length ? game.session.factions.factionTable : false;
      options = options || {};
      options.factions = game.clone(factionTable) || {
        "yamakai": {
          "bandit": "true",
          "meta": {
            "leaders": {
              "leader": {
                "name": "Yamakai",
                "role": "Yama Leader"
              },
              "head_scientist": {
                "name": "Saoon",
                "role": "Head Scientist"
              },
              "head_scientist2": {
                "name": "Saoon2",
                "role": "Head Scientist"
              },
              "head_scientist3": {
                "name": "Saoon4",
                "role": "Head Scientist"
              },
              "head_scientist4": {
                "name": "Saoon4",
                "role": "Head Scientist"
              },
              "head_scientist5": {
                "name": "Saoon5",
                "role": "Head Scientist"
              }
            },
            "desc": "Yamakai are a mostly peaceful tribe in the north. They value harmony and nature, and strive to maintain a balance between the two."
          }
        },
        "sincorp": {
          "bandit": "true",
          "meta": {
            "leaders": {
              "leader": {
                "name": "Xalex",
                "role": "Sin Leader"
              },
              "head_scientist": {
                "name": "Bob",
                "role": "Head Scientist"
              },
              "head_scientist4": {
                "name": "Saoon4",
                "role": "Head Scientist"
              }
            },
            "desc": "Sincorp is a tyrannical corporation that dominates the southern region. They are known for their ruthless pursuit of power and control."
          }
        },
        "roo": {
          "bandit": "true",
          "meta": {
            "leaders": {
              "leader": {
                "name": "Xalex",
                "role": "Sin Leader"
              },
              "head_scientist": {
                "name": "Bob",
                "role": "Head Scientist"
              },
              "head_scientist4": {
                "name": "Saoon4",
                "role": "Head Scientist"
              },
              "head_scientist3": {
                "name": "Saoon4",
                "role": "Head Scientist"
              },
              "head_scientist4": {
                "name": "Saoon4",
                "role": "Head Scientist"
              },
              "head_scientist5": {
                "name": "Saoon5",
                "role": "Head Scientist"
              }
            },
            "desc": "Roo is a mysterious faction that operates in the shadows. Their true motives and goals are unknown, but they are rumored to possess powerful ancient artifacts."
          }
        }
      };
      delete options.factions.nomad;
      delete options.factions.wild;
      delete options.factions.civilian;
      delete options.factions['passive wild'];
      delete options.factions.bandit;
      delete options.factions.hunter;
      const ownedZones = [{
        name: "Landzo City",
        codename: "landzo"
      }, {
        name: "Bleak",
        codename: "bleak"
      }];
      options.w = options.w || 800;
      options.h = options.h || 500;
      const pane = new UIContainer();
      const panebg = new UIPane({
        w: 385,
        h: 200,
        fill: _SETTINGS.ColorStyles.WindowBack
      });
      panebg.x = 25;
      panebg.y = 40;
      pane.addChild(panebg);
      const panebg2 = new UIPane({
        w: 385 - 10,
        h: 200 - 10,
        fill: _SETTINGS.ColorStyles.WindowMain
      });
      panebg2.x = 25 + 5;
      panebg2.y = 40 + 5;
      panebg2.alpha = 0.5;
      pane.addChild(panebg2);
      const factions = options.factions || {};
      const factionNames = Object.keys(factions);
      let currentFactionIndex = 0;
      const factionContainer = new PIXI.Container();
      pane.addChild(factionContainer);
      const factionText = game.render.text(factionNames[currentFactionIndex], 'ingame-label');
      factionText.text = factionText.text.charAt(0).toUpperCase() + factionText.text.slice(1);
      factionText.anchor.set(0.5, 0);
      factionText.x = options.w / 4 + 20;
      factionText.y = 50;
      factionText.alpha = 0.8;
      factionContainer.addChild(factionText);
      const factionText2 = game.render.text("Leaderless", 'ingame-label');
      factionText2.text = factionText2.text.charAt(0).toUpperCase() + factionText2.text.slice(1);
      factionText2.anchor.set(0.5, 0);
      factionText2.x = options.w / 4 + 20;
      factionText2.y = 100;
      factionText2.alpha = !Object.keys(factions[factionNames[currentFactionIndex]].meta.leaders).length ? 1 : 0;
      factionContainer.addChild(factionText2);
      const descriptionText = game.render.mText(factions[factionNames[currentFactionIndex]].meta.desc, 'dialog-main');
      descriptionText.anchor.set(0, 0);
      descriptionText.x = options.w / 2 + 20;
      descriptionText.y = 40;
      descriptionText.alpha = 0.8;
      descriptionText.style.wordWrap = true;
      descriptionText.style.wordWrapWidth = 300;
      const bg = new UIPane({
        w: 350,
        h: descriptionText.height + 250,
        fill: _SETTINGS.ColorStyles.WindowBack
      });
      bg.x = descriptionText.x;
      bg.y = descriptionText.y;
      descriptionText.x += 10;
      descriptionText.y += 10;
      factionContainer.addChild(bg);
      const bg2 = new UIPane({
        w: 340,
        h: descriptionText.height + 240,
        fill: _SETTINGS.ColorStyles.WindowMain
      });
      bg2.x = descriptionText.x - 5;
      bg2.y = descriptionText.y - 5;
      descriptionText.x += 10;
      descriptionText.y += 10;
      factionContainer.addChild(bg2);
      factionContainer.addChild(descriptionText);
      const leftButton = game.render.component('hud_button', {
        name: '<',
        w: 50,
        fill: "0x3d3d3d",
        onClick: function () {
          currentFactionIndex--;
          if (currentFactionIndex < 0) {
            currentFactionIndex = factionNames.length - 1;
          }
          factionText.text = factionNames[currentFactionIndex];
          factionText.text = factionText.text.charAt(0).toUpperCase() + factionText.text.slice(1);
          descriptionText.text = factions[factionNames[currentFactionIndex]].meta.desc;
          factionText2.alpha = !Object.keys(factions[factionNames[currentFactionIndex]].meta.leaders).length ? 1 : 0;
          updateLeaders();
          updateZones(descriptionText);
        }
      });
      leftButton.x = options.w / 4 - 50;
      leftButton.y = options.h - 70;
      factionContainer.addChild(leftButton);
      function updateZones(text) {
        const faction = factionNames[currentFactionIndex];
        const zones = game.session.getFactionZones(faction);
        let i = 0;
        text.text = text.text + "\n\nOwned zones: \n";
        for (let zone of zones) {
          i++;
          text.text = text.text + "\n" + zone.name;
        }
        if (!i) text.text = text.text + "\nNo owned zones";
      }
      updateZones(descriptionText);
      const rightButton = game.render.component('hud_button', {
        name: '>',
        w: 50,
        fill: "0x3d3d3d",
        onClick: function () {
          currentFactionIndex++;
          if (currentFactionIndex >= factionNames.length) {
            currentFactionIndex = 0;
          }
          factionText.text = factionNames[currentFactionIndex];
          factionText.text = factionText.text.charAt(0).toUpperCase() + factionText.text.slice(1);
          descriptionText.text = factions[factionNames[currentFactionIndex]].meta.desc;
          factionText2.alpha = !Object.keys(factions[factionNames[currentFactionIndex]].meta.leaders).length ? 1 : 0;
          updateLeaders();
          updateZones(descriptionText);
        }
      });
      rightButton.x = options.w / 4 + 50;
      rightButton.y = options.h - 70;
      factionContainer.addChild(rightButton);
      const leaderContainer = new PIXI.Container();
      leaderContainer.x = 68;
      leaderContainer.y = 100;
      factionContainer.addChild(leaderContainer);
      function updateLeaders() {
        leaderContainer.removeChildren();
        const leaders = factions[factionNames[currentFactionIndex]].meta.leaders;
        let row = 0;
        let col = 0;
        for (const leaderKey in leaders) {
          const leader = leaders[leaderKey];
          const life = game.session.getNpc(leader.name);
          const copy = new LifeObject(game.randID(), life.data);
          copy.init();
          game.inventories.importInventories(copy, life.inventory);
          const icon = copy.cloneForUI("down");
          icon.x = 3;
          icon.y = 2.5;
          const dead = life.data.dead ? "Dead" : "Alive";
          let zone = game.session.getZone(game.gridPos(life.x), game.gridPos(life.y));
          const lastSeen = "\n\nLAST SEEN: " + zone.name;
          const hp = life && life.data && life.data.stats ? life.data.stats.hp : 100;
          const strength = life && life.data && life.data.levels ? life.data.levels.strength.level : 10;
          const intelligence = life && life.data && life.data.levels ? life.data.levels.intelligence.level : 10;
          const melee = life && life.data && life.data.levels ? life.data.levels.melee.level : 10;
          const ranged = life && life.data && life.data.levels ? life.data.levels.ranged.level : 10;
          let bounty = life && life.data && life.data.bounty ? life.data.bounty : 0;
          bounty = bounty > 0 ? "\n\nBounty: " + bounty : "";
          game.inventories.attachHoverFunctions(icon, {
            data: {
              name: leader.name,
              description: "Status: " + dead + " " + bounty + lastSeen,
              stats: {
                maxHP: hp,
                strength: strength,
                intelligence: intelligence,
                melee: melee,
                ranged: ranged
              }
            }
          });
          const leaderBox = new PIXI.Graphics();
          leaderBox.beginFill(_SETTINGS.ColorStyles.WindowBack);
          leaderBox.drawRect(0, 0, 64, 64);
          leaderBox.endFill();
          leaderBox.x = col * 120;
          leaderBox.y = row * 120;
          leaderContainer.addChild(leaderBox);
          leaderBox.addChild(icon);
          const status = new Sprite('sprite_icon_status_skull_bad');
          status.scale.set(0.5);
          status.x = 32;
          status.y = 32;
          status.alpha = 0;
          if (life.data.dead) status.alpha = 1;
          leaderBox.addChild(status);
          const leaderName = game.render.text(leader.name, 'ingame-label');
          leaderName.anchor.set(0.5, 0);
          leaderName.x = leaderBox.x + 32;
          leaderName.y = leaderBox.y + 65;
          leaderName.alpha = 0.8;
          leaderContainer.addChild(leaderName);
          const leaderRole = game.render.text(leader.role, 'ingame-label');
          leaderRole.anchor.set(0.5, 0);
          leaderRole.x = leaderBox.x + 32;
          leaderRole.y = leaderBox.y + 85;
          leaderRole.alpha = 0.8;
          leaderContainer.addChild(leaderRole);
          col++;
          if (col >= 3) {
            col = 0;
            row++;
          }
        }
      }
      updateLeaders();
      return pane;
    },
    "parent": 'component_huds',
    "name": 'HUD World State'
  };
  _BLUEPRINTS.COMPONENTS.hud_world_tabs = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.w = options.w || 800;
      options.h = options.h || 550;
      options.tabIndex = options.tabIndex || 0;
      const tabNames = ['Factions', 'Map'];
      const tabComponents = [game.render.component('hud_world_state', {
        title: 'Factions'
      }), game.render.component('hud_map', {
        title: 'Map'
      })];
      const tabContainer = game.render.component('component_container_tabs', {
        tabNames: tabNames,
        tabComponents: tabComponents,
        w: options.w,
        h: 40,
        tabIndex: options.tabIndex
      });
      const drawBoxPane = game.render.component('drawBoxPane', {
        x: 0,
        y: 0,
        w: options.w,
        h: options.h,
        title: false,
        showX: true,
        moveable: true,
        onTop: true
      });
      drawBoxPane.addChild(tabContainer);
      return drawBoxPane;
    },
    "parent": 'component_huds',
    "name": 'HUD World  Tabs'
  };
  _BLUEPRINTS.COMPONENTS.hud_radio = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      const album = options.album || _BLUEPRINTS.ALBUM;
      const pane = new UIContainer();
      const songList = new UIContainer();
      pane.addChild(songList);
      const controls = new UIContainer();
      controls.x = 0;
      controls.y = 0;
      controls.width = options.w - 20;
      controls.height = 30;
      pane.addChild(controls);
      const playButton = game.render.component('hud_button', {
        name: '>',
        w: 80
      });
      playButton.x = 160;
      playButton.y = 0;
      controls.addChild(playButton);
      const pauseButton = game.render.component('hud_button', {
        name: '||',
        w: 80
      });
      pauseButton.x = 80;
      pauseButton.y = 0;
      controls.addChild(pauseButton);
      const prevButton = game.render.component('hud_button', {
        name: '<<',
        w: 80
      });
      prevButton.x = 0;
      prevButton.y = 0;
      controls.addChild(prevButton);
      const nextButton = game.render.component('hud_button', {
        name: '>>',
        w: 60
      });
      nextButton.x = 240;
      nextButton.y = 0;
      controls.addChild(nextButton);
      const buttonW = controls.width;
      game.audio.songItems = game.audio.songItems || [];
      game.audio.currentSongIndex = game.audio.currentSongIndex || 0;
      function updateCurrentSong() {
        if (!game.audio.currentSong) return;
        game.radio.radioOn.alpha = 1;
        const song = game.audio.currentSong;
        game.audio.songItems.forEach(songItem => {
          if (songItem.song.name === song.name) {
            songItem.text.text = `${songItem.song.title} - playing`;
          } else {
            songItem.text.text = songItem.song.title;
          }
        });
      }
      function playSong(song) {
        if (game.audio.albumPlaying) game.audio.albumPlaying.stop();
        game.audio.currentSong = song;
        game.audio.albumPlaying = game.audio.play(song.name);
        if (!game.audio.albumPlaying.setupForRadio) {
          game.audio.albumPlaying.on('end', () => {
            playNextSong();
          });
          game.audio.albumPlaying.setupForRadio = true;
        }
        updateCurrentSong();
      }
      function playNextSong() {
        game.audio.currentSongIndex++;
        if (game.audio.currentSongIndex >= album.length) {
          game.audio.currentSongIndex = 0;
        }
        const song = album[game.audio.currentSongIndex];
        playSong(song);
      }
      function playPreviousSong() {
        game.audio.currentSongIndex--;
        if (game.audio.currentSongIndex < 0) {
          game.audio.currentSongIndex = album.length - 1;
        }
        const song = album[game.audio.currentSongIndex];
        playSong(song);
      }
      for (let i = 0; i < album.length; i++) {
        const song = album[i];
        const songItem = game.render.component('hud_button', {
          name: song.title,
          w: buttonW
        });
        songItem.song = song;
        songItem.x = 0;
        songItem.y = i * songItem.height;
        songList.addChild(songItem);
        songItem.index = i;
        songItem.on('pointerup', function () {
          game.audio.currentSongIndex = i;
          playSong(this.song);
        });
        game.audio.songItems.push(songItem);
      }
      controls.y = songList.height;
      playButton.on('pointerup', function () {
        if (game.audio.albumPlaying && typeof game.audio.albumPlaying.play === "function") {
          game.radio.radioOn.alpha = 1;
          game.audio.albumPlaying.play();
        }
      });
      pauseButton.on('pointerup', function () {
        game.audio.albumPlaying.pause();
        game.radio.radioOn.alpha = 0;
      });
      prevButton.on('pointerup', function () {
        playPreviousSong();
      });
      nextButton.on('pointerup', function () {
        playNextSong();
      });
      let offsetX = 25;
      let offsetY = 35;
      const container = game.render.component('drawBoxPane', {
        x: 0,
        y: 0,
        w: pane.width + offsetX * 2,
        h: pane.height + offsetY * 2,
        title: 'Radio',
        showX: true,
        moveable: true,
        corner: "telly_wire"
      });
      game.audio.songItems.forEach(songItem => {
        songItem.on('pointerup', function () {
          playSong(this.song);
        });
      });
      pane.x = offsetX;
      pane.y = offsetY;
      container.addChild(pane);
      updateCurrentSong();
      game.audio.songItems = game.audio.songItems;
      game.audio.currentSongIndex = game.audio.currentSongIndex;
      return container;
    },
    "parent": 'component_huds',
    "name": 'HUD Radio'
  };
  _BLUEPRINTS.COMPONENTS.hud_cheat_menu = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      const cheats = [{
        name: "Give 5 wood",
        command: "giveResource wood 5"
      }, {
        name: "Give 5 stone",
        command: "giveResource stone 5"
      }, {
        name: "Give 5 fiber",
        command: "giveResource fiber 5"
      }, {
        name: "Give 1000 cash",
        command: "addCash 1000"
      }, {
        name: "Spawn buddy",
        command: "buddy"
      }, {
        name: "Revive",
        command: "revive"
      }, {
        name: "Kill",
        command: "kill"
      }, {
        name: "Make Mine",
        command: "mine"
      }];
      const pane = game.render.component('drawBoxPane', {
        x: options.x || 0,
        y: options.y || 0,
        w: 320,
        h: 270,
        title: "Cheats",
        showX: true,
        onClose: () => {},
        moveable: true,
        onTop: true
      });
      let y = 20;
      let x = 10;
      let column = 1;
      for (let i = 0; i < cheats.length; i++) {
        const cheat = cheats[i];
        const cheatButton = game.render.component('hud_button', {
          name: cheat.name,
          w: options.w - 20,
          h: 40,
          fill: '0x3d3d3d',
          onClick: () => {
            ABE.runCheats(cheat.command);
          }
        });
        cheatButton.x = x;
        cheatButton.y = y;
        pane.addChild(cheatButton);
        y += 50;
        if ((i + 1) % 5 === 0) {
          x += cheatButton.width;
          y = 20;
          column++;
        }
      }
      pane.w = options.w * column;
      return pane;
    },
    "parent": 'component_huds',
    "name": 'HUD Cheat menu'
  };
  _BLUEPRINTS.COMPONENTS.hud_button = {
    "options": 'name, onClick, pass, w, h, lblW',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      const name = options.name || 'NONAME';
      const w = options.w || 150;
      const h = options.h || 40;
      const pass = options.pass || false;
      const fill = options.fill || "0x3d3d3d";
      options.corner = options.corner || false;
      const pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: h
      }));
      const outline = new UIPane({
        fullscreen: false,
        fill: 0x15731C,
        padding: 10,
        x: 0 + 2.5,
        y: 0 + 2.5,
        w: w - 4,
        h: h - 4
      });
      outline.alpha = 0;
      pane.outline = outline;
      pane.addChild(outline);
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: fill,
        padding: 5,
        x: 0 + 5,
        y: 0 + 5,
        w: w - 10,
        h: h - 10
      }));
      if (options.corner) {
        const corner = new Sprite('sprite_pane_corner_9');
        corner.y = -43;
        corner.x = -40;
        pane.addChild(corner);
      }
      if (options.corner) {
        const corner = new Sprite('sprite_pane_corner_10');
        corner.y = -43;
        corner.x = w - 78;
        pane.addChild(corner);
      }
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.anchor.set(0.5, 0);
      lbl1.x = w / 2;
      lbl1.y = 0 + 10;
      lbl1.alpha = 0.8;
      pane.text = lbl1;
      pane.addChild(lbl1);
      pane.isInteractive();
      pane.hitArea = new PIXI.Rectangle(0, 0, w, h);
      pane.startAlpha = 1;
      pane.on('pointerup', function () {
        game.audio.play('click');
        this.alpha = this.startAlpha;
        this.outline.alpha = 1;
      });
      pane.on('pointerdown', function () {
        this.startAlpha = this.alpha;
        this.alpha = 0.85;
        this.outline.alpha = 0;
      });
      pane.on('pointerover', function () {
        this.outline.alpha = 1;
      });
      pane.on('pointerout', function () {
        this.outline.alpha = 0;
      });
      if (typeof options.onClick == 'function') {
        pane.on('pointerup', options.onClick);
      }
      pane.passObj = pass;
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Button'
  };
  _BLUEPRINTS.COMPONENTS.hud_checkbox = {
    "options": 'name, isEnabled, onEnable, onDisable, w, h, lblW',
    "getElement": function (options) {
      if (!options) {
        options = {};
        options.isEnabled = function (c) {
          return this.enabled || false;
        };
        options.onEnable = function (c) {
          this.enabled = true;
        };
        options.onDisable = function (c) {
          this.enabled = false;
        };
      }
      let name = options.name || false;
      let w = options.w || 150;
      let h = options.h || 40;
      let lblW = options.lblW || 150;
      let pane = game.render.component('component_container_slim', {
        w: w,
        h: h
      });
      pane.name = name;
      pane.value = options.value || 0;
      pane.createChildren = function (options) {
        if (this.holder) {
          this.holder.destroy();
        }
        let holder = new UIContainer();
        restW = w - lblW;
        if (!options.name) {
          name = this.options.isEnabled.call(this) ? "ENABLED" : "DISABLED";
        }
        lbl1 = game.render.text(name, 'ingame-label');
        lbl1.anchor.set(0.5, 0);
        lbl1.x = w / 2;
        lbl1.y = 10;
        lbl1.alpha = 0.8;
        holder.addChild(lbl1);
        this.holder = holder;
        this.addChild(holder);
        this.alpha = this.isEnabled.call(this) ? 1 : 0.5;
      };
      pane.options = options;
      pane.isEnabled = function () {
        return this.options.isEnabled.call(this);
      };
      pane.createChildren(options);
      pane.isInteractive();
      pane.on('pointerup', function () {
        if (this.isEnabled()) {
          if (typeof this.options.onDisable == 'function') {
            this.options.onDisable.call(this);
          }
        } else {
          this.options.onEnable.call(this);
        }
        this.createChildren(this.options);
      });
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Checkbox'
  };
  _BLUEPRINTS.COMPONENTS.hud_counter = {
    "options": 'ref, value, max, min, w',
    "getElement": function (options) {
      if (!options) {
        const jammy = {
          x: 10
        };
        options = {
          ref: jammy,
          value: 'x',
          max: 10,
          min: 0,
          multi: 1
        };
      }
      options.multi = options.multi || 1;
      let width = options.w || 100;
      let pane = new UIContainer();
      let holdNumber = new UIPane({
        fill: 0x2A2A2A
      });
      pane.addChild(holdNumber);
      holdNumber.x = 50 + 5;
      holdNumber.width = width;
      let text = new TickerContainer(options, function (options) {
        this.addChild(game.render.text(options.ref[options.value], 'ingame-label'));
      }, 0.1);
      pane.addChild(text);
      text.x = 80;
      text.y = 22;
      var btnUp = game.render.component('hud_button', {
        name: '+',
        w: 50,
        fill: "0x3d3d3d"
      });
      btnUp.x = holdNumber.x + holdNumber.width + 5;
      pane.addChild(btnUp);
      btnUp.options = options;
      btnUp.on('pointerup', function () {
        let value = this.options.ref[this.options.value];
        if (value >= this.options.max) {
          return;
        }
        this.options.ref[this.options.value] += this.options.multi;
      });
      holdNumber.height = btnUp.height;
      var btnDown = game.render.component('hud_button', {
        name: '-',
        w: 50,
        fill: "0x3d3d3d"
      });
      pane.addChild(btnDown);
      btnDown.options = options;
      btnDown.on('pointerup', function () {
        let value = this.options.ref[this.options.value];
        if (value <= this.options.min) {
          return;
        }
        this.options.ref[this.options.value] -= this.options.multi;
        if (this.options.ref[this.options.value] < this.options.min) {
          this.options.ref[this.options.value] = this.options.multi;
        }
      });
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Counter'
  };
  _BLUEPRINTS.COMPONENTS.inventoryGrid = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      let xBlocks = options.xBlocks || 1;
      let yBlocks = options.yBlocks || 1;
      let inventory = options.inventory;
      if (!inventory) {
        let tmpLife = new LifeObject();
        inventory = tmpLife.inventory.main;
      }
      let padding = 2;
      let x = 10;
      let y = 10;
      let w = xBlocks * (22 + padding * 4);
      let h = yBlocks * (22 + padding * 4);
      let blockWidth = (w - padding * xBlocks - padding) / xBlocks;
      let blockHeight = (h - padding * yBlocks - padding) / yBlocks;
      let pane = new UIContainer();
      let under = new UIContainer();
      let over = new UIContainer();
      pane.addChild(under);
      pane.addChild(over);
      under.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3c3c3c',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      under.isInteractive();
      let spotY = y + padding;
      let foundIds = {};
      for (var i = 0; i < yBlocks; i++) {
        let spotX = x + padding;
        for (let j = 0; j < xBlocks; j++) {
          let slotData = inventory.getSlot(i, j);
          if (slotData.item !== false && foundIds[slotData.item.id] == undefined) {
            let itemBlockWidth = slotData.item.data.blockWidth || slotData.item.meta.blockWidth;
            let itemBlockHeight = slotData.item.data.blockHeight || slotData.item.meta.blockHeight;
            let maxW = itemBlockWidth * blockWidth;
            let maxH = itemBlockHeight * blockHeight;
            let item = new InventoryItem(slotData.item.name, slotData.item.data, options.disabled, {
              w: maxW,
              h: maxH
            });
            item.isInteractive();
            foundIds[slotData.item.id] = true;
            item.id = slotData.item.id;
            item.x = spotX;
            item.y = spotY;
            item.isShop = inventory.isShop;
            item.inventory = inventory;
            item.inventoryDown = i;
            item.inventoryAcross = j;
            item.data.rawWidth = item.width;
            item.data.rawHeight = item.height;
            itemBlockWidth = item.data.blockWidth || item.meta.blockWidth;
            itemBlockHeight = item.data.blockHeight || item.meta.blockHeight;
            over.addChild(item);
            if (item.isQuantity) {
              let qtyText = game.render.text(item.data.qty, 'item-gold');
              qtyText.x = item.x;
              qtyText.y = item.y;
              over.addChild(qtyText);
            }
            item.on('pointerup', function () {
              let item = this;
              let dropItem = game.holdingItem;
              if (!item || !dropItem) {
                return;
              }
              let inv1 = item.inventory;
              let inv2 = dropItem.inventory;
              if (!dropItem.isQuantity || dropItem.codename !== item.codename) {
                return;
              }
              if (item.data.qty >= item.maxStack) {
                return;
              }
              dropItem.data.qty = parseInt(dropItem.data.qty);
              item.data.qty = parseInt(item.data.qty);
              let total = dropItem.data.qty;
              let freeSpace = item.maxStack - item.data.qty;
              if (item.data.qty + total > item.maxStack) {
                item.data.qty += freeSpace;
                dropItem.data.qty -= freeSpace;
              } else {
                item.data.qty += total;
                dropItem.data.qty -= total;
              }
              if (dropItem.data.qty < 1) {
                dropItem.inventory.removeItem(dropItem);
              }
              if (typeof item.inventory.addCallback == 'function') {
                item.inventory.addCallback(item);
              }
              inv1.refreshGrid();
              inv2.refreshGrid();
            });
          }
          let itemSlot = new UIPane({
            noContainer: true,
            fullscreen: false,
            fill: '0x212121',
            padding: 0,
            x: spotX,
            y: spotY,
            w: blockWidth,
            h: blockHeight
          });
          itemSlot.inventory = inventory;
          itemSlot.across = j;
          itemSlot.down = i;
          itemSlot.isInteractive();
          let px1 = blockWidth / 1000 * 10;
          itemSlot.hitArea = new PIXI.Rectangle(0, 0, 1 + px1, 1 + px1);
          if (slotData.item !== false) {
            itemSlot.alpha = 0.25;
          }
          itemSlot.on('pointerup', function () {
            if (game.holdingItem == undefined || game.holdingItem == false) {
              return false;
            }
            game.holdingItem.alpha = 0;
            placeItem = game.holdingItem;
            game.holdingItem.hitArea = new PIXI.Rectangle(0, 0, game.holdingItem.width, game.holdingItem.height);
            if (game.inventories.canAddToInventory(this.inventory, game.holdingItem, this)) {
              game.holdingItem.ghost.destroy();
              if (game.holdingItem.inventory !== undefined) {
                game.holdingItem.inventory.removeItem(game.holdingItem);
                if (!game.inventories.addToInventory(this.inventory, game.holdingItem, this)) {
                  this.inventory.addItemNow(game.holdingItem);
                }
                destroy = true;
              } else {
                if (game.inventories.addToInventory(this.inventory, game.holdingItem, this) == false) {
                  game.holdingItem.alpha = 1;
                } else {
                  destroy = true;
                }
              }
            } else {
              if (game.inventories.isFarAway(this.inventory, game.holdingItem.inventory)) {
                game.notify("Too far away");
              } else {
                let origInventory = game.holdingItem.inventory;
                if (game.holdingItem.inventory) {
                  game.holdingItem.inventory.removeItem(game.holdingItem);
                }
                if (!this.inventory.addItemNow(game.holdingItem, false, game.holdingItem.data.qty, true)) {
                  origInventory.addItemNow(game.holdingItem, false, game.holdingItem.data.qty);
                }
              }
            }
            if (game.holdingItem.inventory && game.holdingItem.inventory.refreshGrid !== undefined) {
              game.holdingItem.inventory.refreshGrid();
            }
            game.holdingItem.ghost.destroy();
            game.holdingItem.alpha = 1;
            game.holdingItem = undefined;
          });
          under.addChild(itemSlot);
          spotX += blockWidth + padding;
        }
        spotY += blockHeight + padding;
      }
      pane.x = options.x || pane.x;
      pane.y = options.y || pane.y;
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Inventory Grid'
  };
  _BLUEPRINTS.COMPONENTS.pagerbuttons = {
    "options": 'pagerList{}, ',
    "getElement": function (options) {
      if (!options) {
        options = {
          pagerList: game.render.componentRaw('pagerlist')
        };
      }
      var pane = new UIContainer();
      var back = game.render.componentRaw('squareWBorder', {
        x: 0,
        y: 0,
        w: 32,
        h: 32
      });
      pane.back = back;
      back.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: 32,
        h: 32
      }));
      back.pagerList = options.pagerList;
      back.isInteractive();
      back.on('pointerup', function () {
        this.pagerList.pageDown();
      });
      var fwd = game.render.componentRaw('squareWBorder', {
        x: 0,
        y: 0,
        w: 32,
        h: 32
      });
      fwd.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: 32,
        h: 32
      }));
      fwd.pagerList = options.pagerList;
      pane.fwd = fwd;
      fwd.isInteractive();
      fwd.x = options.w - fwd.width;
      fwd.on('pointerup', function () {
        this.pagerList.pageUp();
      });
      xText = game.render.text('>>', 'ui-bold');
      xText.x = 7.5;
      xText.y = 7.5;
      fwd.addChild(xText);
      xText = game.render.text('<<', 'ui-bold');
      xText.x = 7.5;
      xText.y = 7.5;
      back.addChild(xText);
      pane.addChild(back);
      pane.addChild(fwd);
      options.pagerList.addPageButtons(pane);
      options.pagerList.refresh();
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Pager Buttons Component'
  };
  _BLUEPRINTS.COMPONENTS.component_text_input = {
    "options": 'text, onChange',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      options.w = options.w || 300;
      const pane = new UIContainer('component_keyboard_input');
      pane.id = game.randID();
      let selector = pane.id;
      let existing = $("#" + selector);
      if (existing) {
        existing.remove();
      }
      let defaultText = options.text || "Im here";
      $("body").append(`
	<input type='text' style='z-index:10000;display:block;position:absolute;top:0; left:-1000px'
	 id="${selector}" value="${defaultText}"
	>
  `);
      let elem = $("#" + selector);
      const container = new UIContainer();
      pane.addChild(container);
      const showBox = game.render.componentRaw('component_container_slim', {
        w: options.w,
        h: 32
      });
      showBox.alpha = 0;
      container.addChild(showBox);
      const textLabel = game.render.text("null", 'info-tagline');
      textLabel.anchor.set(0);
      textLabel.x = 16;
      textLabel.y = 6;
      textLabel.isInteractive();
      const activate = e => {
        if (showBox.alpha === 1) {
          return;
        }
        showBox.alpha = 1;
        elem[0].selectionStart = elem[0].selectionEnd = elem[0].value.length;
        elem.isActive = true;
        onChange(e);
        game.input.kbInputMode = true;
        setTimeout(() => {
          textLabel.isInteractive();
          elem.focus();
          elem.change();
        }, 100);
      };
      textLabel.on('pointerdown', activate);
      const insert_at = function (index, str, add) {
        if (isNaN(index)) {
          return str + add;
        } else {
          return str.substr(0, index) + add + str.substr(index);
        }
      };
      const onChange = e => {
        if (elem.isActive) {
          const position = e.target.selectionStart;
          textLabel.text = insert_at(position, elem.val(), "|");
        } else {
          textLabel.text = elem.val();
        }
        pane.value = textLabel.text;
        if (typeof options.onChange == "function") {
          options.onChange(textLabel.text);
        }
      };
      elem.on('keydown', onChange);
      elem.on('keyup', onChange);
      elem.on('change', onChange);
      const onFocusOut = e => {
        textLabel.isInteractive();
        game.input.kbInputMode = false;
        elem.isActive = false;
        onChange(e);
        onChange(e);
        showBox.alpha = 0;
      };
      elem.on('focusout', onFocusOut);
      onChange({});
      textLabel.isInteractive();
      container.addChild(textLabel);
      pane.value = textLabel.text;
      pane.activate = activate;
      return pane;
    },
    "destroyElement": function () {
      $("#" + this.id).remove();
    },
    "parent": 'component_inputs',
    "name": 'Text Input'
  };
  _BLUEPRINTS.COMPONENTS.test_albear = {
    "options": 'name, onClick, pass, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      var player = new LifeObject();
      player.x = 0;
      player.y = 0;
      player.setBlank();
      player.randomizeStats(8);
      player.data.name = "Albear";
      player.data.faction = 'sincorp';
      player.data.levels.toughness.level = game.rng(50, 75);
      player.inventory.body.addItem(new InventoryItem('ss_item_body_albear'), true);
      player.data.dir = "down";
      player.data.dialog = 'dialog_syn_shopkeeper';
      let pane = new UIContainer();
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Albear Test'
  };
  _BLUEPRINTS.COMPONENTS.hud_slider = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      var container = new UIContainer();
      Object.assign(container, options);
      var w = options.w || 300;
      var h = options.h || 10;
      var min = options.min || 1;
      var max = options.max || 100;
      var value = typeof options.value === "number" ? options.value : 0;
      var bar = new PIXI.Graphics();
      bar.beginFill(0x212121);
      bar.drawRoundedRect(0, h / 2 - 5, w, 10, 10);
      var slider = new PIXI.Graphics();
      slider.beginFill(0xffffff);
      slider.drawCircle(0, 0, h);
      slider.x = w / (max - min) * (value - min);
      slider.y = h / 2;
      slider.interactive = true;
      slider.buttonMode = true;
      var text = game.render.text(value, 'ingame-label');
      text.anchor.set(0, 0.5);
      text.x = slider.x + h / 2;
      text.y = slider.y;
      slider.on('pointerdown', function () {
        this.data = this.data || {};
        this.data.dragging = true;
        game.event.emit('uiSliderStart', options.name || '');
      });
      slider.on('pointerup', function () {
        this.data = this.data || {};
        this.data.dragging = false;
        game.event.emit('uiSliderEnd', options.name || '', text.text);
      });
      slider.on('pointerupoutside', function () {
        this.data = this.data || {};
        this.data.dragging = false;
        game.event.emit('uiSliderEnd', options.name || '', text.text);
      });
      slider.on('pointermove', function (e) {
        if (this.data && this.data.dragging) {
          var newPosX = e.data.getLocalPosition(this.parent).x;
          if (newPosX < 0) newPosX = 0;
          if (newPosX > w) newPosX = w;
          this.x = newPosX - h / 2;
          var currentValue = Math.round((max - min) * (newPosX / w) + min);
          container.value = currentValue;
          text.text = currentValue;
          game.event.emit('uiSliderChange', options.name || '', currentValue);
        }
      });
      container.addChild(bar);
      container.addChild(slider);
      container.addChild(text);
      return container;
    },
    "parent": 'component_inputs',
    "name": 'Slider'
  };
  _BLUEPRINTS.COMPONENTS.hud_dropdown = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      const x = options.x || 0;
      const y = options.y || 0;
      const w = options.w || 150;
      const h = options.h || 40;
      const items = options.items || ['val2', 'val1'];
      const selected = options.selected || 'val2';
      const pane = new UIContainer();
      pane.x = x;
      pane.y = y;
      const background = new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: h
      });
      pane.addChild(background);
      const label = game.render.text(selected, 'ingame-label');
      label.anchor.set(0, 0.5);
      label.x = 10;
      label.y = h / 2;
      label.alpha = 0.8;
      pane.addChild(label);
      const arrow = new PIXI.Graphics();
      arrow.beginFill(0xffffff);
      arrow.moveTo(w - 20, h / 2 - 5);
      arrow.lineTo(w - 15, h / 2 + 5);
      arrow.lineTo(w - 10, h / 2 - 5);
      arrow.endFill();
      pane.addChild(arrow);
      const dropdownContainer = new UIContainer();
      dropdownContainer.x = 0;
      dropdownContainer.y = h;
      dropdownContainer.visible = false;
      pane.addChild(dropdownContainer);
      const dropdownBackground = new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: 0,
        y: 0,
        w: w,
        h: items.length * h
      });
      dropdownContainer.addChild(dropdownBackground);
      const dropdownItems = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const dropdownItem = game.render.component('hud_button', {
          name: item,
          w: w,
          h: h
        });
        dropdownItem.y = i * h;
        dropdownItem.on('pointerup', function () {
          label.text = item;
          dropdownContainer.visible = false;
        });
        dropdownItems.push(dropdownItem);
        dropdownContainer.addChild(dropdownItem);
      }
      pane.isInteractive();
      pane.on('pointerup', function () {
        dropdownContainer.visible = !dropdownContainer.visible;
      });
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Dropdown'
  };
  _BLUEPRINTS.COMPONENTS.hud_aorb_input = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const w = options.w || 150;
      const h = options.h || 40;
      const option1 = options.option1 || "op1";
      const option2 = options.option2 || "op2";
      const defaultValue = options.defaultValue || 0;
      const onChange = options.onChange || null;
      const container = new UIContainer();
      const button1 = game.render.component('hud_button', {
        name: option1,
        w: w / 2,
        h: h,
        onClick: function () {
          button1.alpha = 1;
          button2.alpha = 0.5;
          if (typeof onChange === 'function') {
            onChange(option1);
          }
        }
      });
      button1.x = 0;
      container.addChild(button1);
      const button2 = game.render.component('hud_button', {
        name: option2,
        w: w / 2,
        h: h,
        onClick: function () {
          button1.alpha = 0.5;
          button2.alpha = 1;
          if (typeof onChange === 'function') {
            onChange(option2);
          }
        }
      });
      button2.x = w / 2;
      container.addChild(button2);
      if (defaultValue === 0) {
        button1.alpha = 1;
        button2.alpha = 0.5;
      } else {
        button1.alpha = 0.5;
        button2.alpha = 1;
      }
      return container;
    },
    "parent": 'component_inputs',
    "name": 'A or B input'
  };
  _BLUEPRINTS.COMPONENTS.component_list_selector = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const w = options.w || 300;
      const h = options.h || 200;
      const leftList = options.leftList || ['left', 'two', 'three'];
      const rightList = options.rightList || [' another1'];
      const pane = new UIContainer();
      const leftPane = new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w / 2,
        h: h
      });
      const rightPane = new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: w / 2,
        y: 0,
        w: w / 2,
        h: h
      });
      pane.addChild(leftPane);
      pane.addChild(rightPane);
      const leftListContainer = new UIContainer();
      const rightListContainer = new UIContainer();
      leftPane.addChild(leftListContainer);
      rightPane.addChild(rightListContainer);
      const itemHeight = 30;
      const itemSpacing = 5;
      let leftItems = [];
      let rightItems = [];
      const updateLists = () => {
        leftListContainer.removeChildren();
        rightListContainer.removeChildren();
        leftItems = [];
        rightItems = [];
        for (let i = 0; i < leftList.length; i++) {
          const item = leftList[i];
          const itemContainer = new UIContainer();
          itemContainer.name = item;
          itemContainer.y = i * (itemHeight + itemSpacing);
          const itemName = game.render.text(item, 'ingame-label');
          itemName.anchor.set(0, 0.5);
          itemName.x = 10;
          itemName.y = itemHeight / 2;
          const itemBackground = new UIPane({
            fullscreen: false,
            fill: '0x3d3d3d',
            padding: 5,
            x: 0,
            y: 0,
            w: w / 2 - 10,
            h: itemHeight
          });
          itemContainer.addChild(itemBackground);
          itemContainer.addChild(itemName);
          leftItems.push(itemContainer);
          leftListContainer.addChild(itemContainer);
          itemContainer.isInteractive();
          itemContainer.on('pointerup', () => {
            leftList.splice(i, 1);
            rightList.push(item);
            updateLists();
          });
        }
        for (let i = 0; i < rightList.length; i++) {
          const item = rightList[i];
          const itemContainer = new UIContainer();
          itemContainer.name = item;
          itemContainer.y = i * (itemHeight + itemSpacing);
          const itemName = game.render.text(item, 'ingame-label');
          itemName.anchor.set(0, 0.5);
          itemName.x = 10;
          itemName.y = itemHeight / 2;
          const itemBackground = new UIPane({
            fullscreen: false,
            fill: '0x3d3d3d',
            padding: 5,
            x: 0,
            y: 0,
            w: w / 2 - 10,
            h: itemHeight
          });
          itemContainer.addChild(itemBackground);
          itemContainer.addChild(itemName);
          rightItems.push(itemContainer);
          rightListContainer.addChild(itemContainer);
          itemContainer.isInteractive();
          itemContainer.on('pointerup', () => {
            rightList.splice(i, 1);
            leftList.push(item);
            updateLists();
          });
        }
      };
      updateLists();
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'List Selector'
  };
  _BLUEPRINTS.COMPONENTS.compoent_test = {
    "getElement": function (options) {
      return game.render.component('hud_button');
    },
    "parent": 'component_inputs',
    "name": 'test'
  };
  _BLUEPRINTS.COMPONENTS.catdog = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const buttons = [{
        name: 'cat',
        onClick: () => void 0
      }, {
        name: 'dog',
        onClick: () => void 0
      }, {
        name: 'lizard',
        onClick: () => void 0
      }];
      const w = options.w || 150;
      const h = options.h || 40;
      const pane = new UIContainer();
      let y = 0;
      buttons.forEach(button => {
        const btn = game.render.component('hud_button', {
          name: button.name,
          w: w,
          h: h,
          onClick: button.onClick
        });
        btn.y = y;
        pane.addChild(btn);
        y += h + 10;
      });
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'catdog'
  };
  _BLUEPRINTS.COMPONENTS.eating_animals = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const w = options.w || 450;
      const h = options.h || 150;
      const pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: 0 + 5,
        y: 0 + 5,
        w: w - 10,
        h: h - 10
      }));
      const dogButton = game.render.component('hud_button', {
        name: 'Dog',
        w: 100,
        h: 40
      });
      dogButton.x = 20;
      dogButton.y = 20;
      pane.addChild(dogButton);
      const catButton = game.render.component('hud_button', {
        name: 'Cat',
        w: 100,
        h: 40
      });
      catButton.x = 150;
      catButton.y = 20;
      pane.addChild(catButton);
      const lizardButton = game.render.component('hud_button', {
        name: 'Lizard',
        w: 100,
        h: 40
      });
      lizardButton.x = 280;
      lizardButton.y = 20;
      pane.addChild(lizardButton);
      dogButton.on('pointerup', function () {
        catButton.alpha = 0;
        lizardButton.alpha = 0;
      });
      catButton.on('pointerup', function () {
        dogButton.alpha = 0;
        lizardButton.alpha = 0;
      });
      lizardButton.on('pointerup', function () {
        dogButton.alpha = 0;
        catButton.alpha = 0;
      });
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Eating animals'
  };
  _BLUEPRINTS.COMPONENTS.hud_radiod_button = {
    "options": 'name, isEnabled, onEnable, onDisable, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const name = options.name || 'NONAME';
      const w = options.w || 150;
      const h = options.h || 40;
      const pass = options.pass || false;
      const fill = options.fill || "0x3d3d3d";
      const isChecked = options.isChecked || false;
      const pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: fill,
        padding: 5,
        x: 0 + 5,
        y: 0 + 5,
        w: w - 10,
        h: h - 10
      }));
      const radio = new UIContainer();
      radio.addChild(new UIPane({
        fill: '0xffffff',
        padding: 0,
        x: 0,
        y: 0,
        w: 20,
        h: 20
      }));
      radio.addChild(new UIPane({
        fill: '0x000000',
        padding: 0,
        x: 5,
        y: 5,
        w: 10,
        h: 10
      }));
      if (isChecked) {
        radio.getChildAt(1).visible = true;
      } else {
        radio.getChildAt(1).visible = false;
      }
      radio.x = 10;
      radio.y = (h - radio.height) / 2;
      pane.addChild(radio);
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.anchor.set(0, 0.5);
      lbl1.x = radio.x + radio.width + 10;
      lbl1.y = h / 2;
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      pane.isInteractive();
      pane.on('pointerup', function () {
        game.audio.play('click');
        radio.getChildAt(1).visible = !radio.getChildAt(1).visible;
      });
      if (typeof options.onClick == 'function') {
        pane.on('pointerup', options.onClick);
      }
      pane.passObj = pass;
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Radiod Button'
  };
  _BLUEPRINTS.COMPONENTS.request_text = {
    "options": 'w, h, onClick, title',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      const w = options.w || 400;
      const h = options.h || 230;
      const onClickCallback = options.onClick || function (val) {};
      const title = options.title || 'Save name';
      const btnText = options.btnText || 'Save';
      const text = options.text || 'New Save';
      const pane = game.render.component('drawBoxPane', {
        x: options.x || 0,
        y: options.y || 0,
        w: w,
        h: h,
        moveable: true,
        showX: true
      });
      const pane2 = game.render.component('drawBoxPane', {
        w: w - 50,
        h: 100,
        moveable: false,
        title: title,
        showX: false
      });
      pane2.x = 25;
      pane2.y = 50;
      pane.addChild(pane2);
      const input = game.render.component('component_text_input', {
        text: text,
        w: w - 95,
        h: 40
      });
      input.x = 20;
      input.y = 35;
      pane2.addChild(input);
      input.activate({
        target: {}
      });
      const saveButton = game.render.component('hud_button', {
        name: btnText,
        w: 100
      });
      saveButton.x = w - saveButton.width - 25;
      saveButton.y = h - saveButton.height - 25;
      pane.addChild(saveButton);
      const onClick = e => {
        onClickCallback(input.value);
        pane.destroy();
      };
      saveButton.on('pointerup', onClick);
      pane.width = w;
      pane.height = h;
      return pane;
    },
    "parent": 'component_inputs',
    "name": 'Request Text'
  };
  _BLUEPRINTS.COMPONENTS.statBar = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.w = options.w || 200;
      options.h = options.h || 25;
      options.name = options.name || 'HP';
      options.value = options.value || 0;
      options.fill = options.fill || 0x990000;
      options.maxValue = options.maxValue || 100;
      const container = new UIContainer();
      var padding = options.padding || 5;
      container.padding = padding;
      var backPane = new UIPane({
        background: 'darker',
        w: options.w,
        h: options.h
      });
      container.addChild(backPane);
      var valuePane = new UIPane({
        fill: options.fill,
        w: options.w,
        h: options.h - padding * 2
      });
      valuePane.x = padding;
      valuePane.y = padding;
      container.valuePane = valuePane;
      container.addChild(valuePane);
      if (options.name) {
        let text = game.render.text(options.name, 'text-label');
        text.anchor.set(0, 0.5);
        text.x = 10;
        text.y = 11;
        text.alpha = 0.69;
        container.text = text;
        container.text.origText = options.name;
        container.addChild(text);
      }
      container.updateVal = function (val, max) {
        let valuePane = this.valuePane;
        let padding = this.padding;
        var onePercent = max / 100;
        var percentTaken = val / onePercent;
        var onePercentOfWidth = (options.w - padding * 2) / 100;
        valuePane.width = onePercentOfWidth * percentTaken;
        val = Math.floor(val);
        max = Math.ceil(max);
        this.text.text = `${this.text.origText} ${val}/${max}`;
      };
      container.updateVal(options.value, options.maxValue);
      return container;
    },
    "parent": 'component_outputs',
    "name": 'statBar'
  };
  _BLUEPRINTS.COMPONENTS.component_stat_table = {
    "options": 'item',
    "getElement": function (options) {
      if (options == undefined) {
        options = JSON.parse(`{"showRecipe": true,"codename":"p_ss_weapon_shotty1",
        "amount":"20","require":"research_node","readName":"Advanced Shotgun",
        "data":{"BASE_DMG":2,"LIFETIME":3,"SPEED":0.2,"BLEED_DURATION":10,"BLEED_CHANCE":10,"SPRITE":"projectile_simple",
        "TYPE":"ballistic","stance":"none","stats":{"type":"ballistic","baseDmg":2,"speed":0.2,"range":3},
        "quality":1,"sellPrice":991,"buyPrice":2477,"value":1651,"rawWidth":59,"rawHeight":59},"meta":{"description":"A more modern version of the classic shotgun. It appears to be locked to certain DNA signatures, rendering it useless unless assigned to you.","weight":1,"contextOptions":"equipt","slots":"weapon","blockWidth":4,"blockHeight":2,"stance":"longgun","value":1500}}`);
      }
      displayStat = function (name, label) {
        return {
          name: name,
          label: label
        };
      };
      let stats = options.stats || options.data.stats || options.meta.stats || false;
      let width = options.oWidth || options.w || 450;
      let statsContainer = new UIContainer();
      let showResourceIcons = typeof options.showResourceIcons === "undefined" ? true : options.showResourceIcons;
      let startY = 0;
      let statY = startY;
      let statTable = options.statTable || {};
      Object.assign(statTable, {
        'maxSpeed': displayStat('Max Speed', 'v%'),
        'maxHP': displayStat('Max HP', 'v%'),
        'maxWeight': displayStat('Max Weight', '+v'),
        'savage': displayStat('Savage', '+v'),
        'melee': displayStat('Melee', '+v'),
        'athletics': displayStat('Athletics', '+v'),
        'ranged': displayStat('Ranged', '+v'),
        'toughness': displayStat('toughness', '+v'),
        'strength': displayStat('Strength', '+v'),
        'craft': displayStat('Craft', '+v'),
        'intelligence': displayStat('Intelligence', '+v'),
        'bluntReduction': displayStat('Blunt Reduction', '-v'),
        'ballisticReduction': displayStat('Ballistic Reduction', '-v'),
        'sharpReduction': displayStat('Sharp Reduction', '-v'),
        'tempHeat': displayStat('Heat reduction', 'v hU'),
        'tempCold': displayStat('Cold reduction', 'v hU'),
        'baseDmg': displayStat('Base Damage', '+v'),
        'speed': displayStat('Speed', '+v'),
        'type': displayStat('Type', 'v'),
        'bleedChance': displayStat('Bleed Chance', 'v%'),
        'bleedDuration': displayStat('Bleed Duration', 'v'),
        'range': displayStat('Range', 'Vm')
      });
      for (statName in stats) {
        let statsValue = stats[statName];
        let statDisplayName = statTable[statName] ? statTable[statName].name : statName;
        let statLabel = new UIContainer();
        try {
          statLabel = statTable[statName].label.replace(/v/, statsValue).replace(/V/, statsValue * 10);
        } catch (e) {}
        let label = game.render.component('drawLabel', {
          showIcon: showResourceIcons,
          name: statDisplayName,
          value: statLabel,
          h: 30,
          w: width - 50
        });
        try {
          let item = new InventoryItem('ss_item_' + statName);
          if (item.isQuantity) {
            label = game.render.component('drawIconLabel', {
              sprite: item.sprite,
              name: item.readName,
              value: statLabel,
              w: width - 50
            });
          }
        } catch (e) {}
        label.x = 0;
        label.y = statY;
        statY += label.height + 2;
        statsContainer.addChild(label);
      }
      return statsContainer;
    },
    "parent": 'component_outputs',
    "name": 'Stat Table'
  };
  _BLUEPRINTS.COMPONENTS.moneyLabel = {
    "options": 'amount',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      name = options.name || 'NONAME';
      value = options.value || 0;
      x = options.x || 0;
      y = options.y || 0;
      w = options.w || 100;
      h = options.h || 30;
      lblW = options.lblW || 100 - 10;
      var pane = new UIContainer();
      pane.width = w;
      pane.height = h;
      restW = w - lblW;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: lblW,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + lblW,
        y: y + 5,
        w: restW - 5,
        h: h - 10
      }));
      lbl1 = game.render.text('M', 'item-gold');
      lbl1.x = x + 15;
      lbl1.y = -2 + h / 2;
      lbl1.anchor.set(0, 0.5);
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      lbl2 = game.render.text(game.format(value), 'ingame-label');
      lbl2.x = x + 35;
      lbl2.y = 0 + h / 2 - 1;
      lbl2.anchor.set(0, 0.5);
      lbl2.alpha = 0.8;
      pane.addChild(lbl2);
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Money Label'
  };
  _BLUEPRINTS.COMPONENTS.hud_makes_cool = {
    "options": '',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      var container = new UIContainer();
      let pane = new UIContainer();
      container.addChild(pane);
      let xOff = -150;
      let gap = 10;
      game.tweens.hscreen = function (obj) {
        obj.tween = createjs.Tween.get(obj, {
          override: false,
          loop: -1
        }).to({
          y: -1000
        }, game.rng(10000, 30000), createjs.Ease.getPowIn(game.rng(1, 3) + 0.2));
      };
      let count = game.ui._VIEWPORT_RIGHT / 5;
      for (let i = 0; i < count; i++) {
        let scale = game.rng(1, 2.5);
        let ball1 = new Sprite('sprite_lavalamp_ball');
        ball1.x = 5 + xOff;
        ball1.y = game.rng(0, game.ui._VIEWPORT_BOTTOM + 500);
        ball1.scale.x = scale;
        ball1.scale.y = scale;
        pane.addChild(ball1);
        xOff += gap;
        game.tween(ball1, 'hscreen');
      }
      pane.filters = [game.render.filters.bloom];
      return container;
    },
    "parent": 'component_outputs',
    "name": 'Makes cool'
  };
  _BLUEPRINTS.COMPONENTS.component_list_item_queue = {
    "options": 'w, h, label, startTime, duration, queue, queueIndex',
    "getElement": function (options) {
      if (!options) {
        options = {
          w: 450,
          h: 50
        };
        options.queue = new CraftQueue(new ComplexItem('pers_worlditem_smelter'), {});
      }
      var w = options.w || 450;
      var h = options.h || 50;
      let recipe = options.recipe || 'ss_item_metalingot';
      let crafts = new InventoryItem(_BLUEPRINTS.RECIPES['recipe_' + recipe].crafts);
      var label = crafts.readName || 'Antique Shotgun';
      var startTime = options.startTime || false;
      var duration = options.duration || 250000;
      var timeLeft = startTime + duration - Date.now();
      var queue = options.queue;
      var queueIndex = options.queueIndex;
      const queueItem = queue.data.list[queueIndex];
      let timeLeftString;
      if (startTime === false) {
        timeLeftString = Math.floor(duration) / 10000;
      } else {
        timeLeftString = Math.floor(timeLeft) / 10000;
      }
      var pane = game.render.componentRaw('drawBoxPane', {
        moveable: false,
        showX: false,
        w: w,
        h: h
      });
      var text = game.render.text(timeLeftString + "mins :: " + label, 'ingame-label');
      text.x = 25;
      text.y = 15;
      pane.addChild(text);
      var cancelBtn = game.render.component('hud_button', {
        name: 'Cancel'
      });
      pane.addChild(cancelBtn);
      cancelBtn.x = w - cancelBtn.width - 5;
      cancelBtn.y = 5;
      cancelBtn.queue = queue;
      cancelBtn.queueIndex = queueIndex;
      cancelBtn.isInteractive();
      cancelBtn.options = options;
      cancelBtn.on('pointerup', function () {
        this.queue.removeItemAt(this.queueIndex);
      });
      var repeatBtn = game.render.component('hud_button', {
        w: 36,
        name: ' '
      });
      pane.addChild(cancelBtn);
      repeatBtn.x = w - cancelBtn.width - 37;
      repeatBtn.y = 5;
      repeatBtn.queue = queue;
      repeatBtn.queueIndex = queueIndex;
      repeatBtn.isInteractive();
      repeatBtn.options = options;
      repeatBtn.on('pointerup', function () {
        this.icon.alpha = this.icon.alpha === 1 ? 0.5 : 1;
        if (this.icon.alpha === 1) {
          this.queue.repeatItemAt(this.queueIndex);
        } else {
          this.queue.stopRepeatItemAt(this.queueIndex);
        }
      });
      pane.addChild(repeatBtn);
      var repeatBtnIcon = new Sprite('icon_repeat');
      repeatBtnIcon.x = 1;
      repeatBtnIcon.y = 1;
      repeatBtnIcon.alpha = queueItem.repeats ? 1 : 0.5;
      repeatBtnIcon.scale.set(0.55);
      repeatBtn.icon = repeatBtnIcon;
      repeatBtn.addChild(repeatBtnIcon);
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'List Item for Queue'
  };
  _BLUEPRINTS.COMPONENTS.pager = {
    "options": 'items[], width, rowWidth, rowHeight, itemsPerPage',
    "getElement": function (options) {
      if (options.items.length == 0) {
        return new UIContainer();
      }
      var buttonsHeight = 50;
      var items = options.items;
      var total = items.length;
      var width = options.width;
      let gap = options.gap || 0;
      var rowHeight = options.rowHeight || items[0].height;
      var rowWidth = options.rowWidth || items[0].width;
      var itemsPerPage = options.itemsPerPage || Math.floor(options.height / rowHeight);
      var page = options.page || 1;
      var ticks = options.ticks || false;
      var container = new UIContainer();
      var template = options.template || 'pagerlist';
      var cols = options.cols || 4;
      if (itemsPerPage == undefined || !Number.isInteger(itemsPerPage)) {
        return container;
      }
      var pagerList = game.render.componentRaw(template, {
        gap: gap,
        cols: cols,
        ticks: ticks,
        page: page,
        itemsPerPage: itemsPerPage,
        items: items
      });
      container.addChild(pagerList);
      var pagerButtons = container.addChild(game.render.componentRaw('pagerbuttons', {
        ticks: ticks,
        w: width,
        page: 1,
        container: container,
        pagerList: pagerList
      }));
      pagerButtons.y = pagerList.y + pagerList.height + 15;
      container.buttons = pagerButtons;
      container.pages = pagerList;
      container.addChild(pagerButtons);
      container.addChild(pagerList);
      return container;
    },
    "parent": 'component_outputs',
    "name": 'Pager Component'
  };
  _BLUEPRINTS.COMPONENTS.pagerlist = {
    "options": 'items[], page',
    "getElement": function (options) {
      var pane = new UIContainer();
      pane.pageContents = [];
      pane.items = options.items;
      pane.pages = Math.ceil(options.items.length / options.itemsPerPage);
      pane.page = options.page;
      pane.itemsPerPage = options.itemsPerPage;
      pane.ticks = options.ticks;
      pane.refresh = function () {
        if (this.page == 1) {
          this.pageButtons.back.alpha = 0;
          this.pageButtons.back.interactive = false;
        } else {
          this.pageButtons.back.alpha = 1;
          this.pageButtons.back.interactive = true;
        }
        if (this.page == this.pages) {
          this.pageButtons.fwd.alpha = 0;
          this.pageButtons.fwd.interactive = false;
        } else {
          this.pageButtons.fwd.interactive = true;
          this.pageButtons.fwd.alpha = 1;
        }
        var startOffset = this.itemsPerPage * (this.page - 1);
        yOffset = 0;
        for (var i = 0; i < this.items.length; i++) {
          if (this.items[i] == undefined) {
            continue;
          }
          let item = this.addChild(this.items[i]);
          item.origAlpha = item.alpha;
          item.alpha = 0;
          item.interactive = false;
          if (i >= startOffset && i < startOffset + this.itemsPerPage) {
            item.alpha = item.origAlpha;
            item.isInteractive();
            item.y = yOffset;
            yOffset += item.height;
          }
          this.pageContents.push(item);
        }
      };
      pane.pageUp = function () {
        if (this.page == this.pages) {
          return false;
        }
        this.page++;
        if (!this.ticks) {
          this.empty();
          this.refresh();
        }
      };
      pane.pageDown = function () {
        if (this.page == 1) {
          return false;
        }
        this.page--;
        if (!this.ticks) {
          this.empty();
          this.refresh();
        }
      };
      pane.empty = function () {
        for (var i = 0; i < this.pageContents.length; i++) {
          this.removeChild(this.pageContents[i]);
        }
      };
      pane.addPageButtons = function (btns) {
        this.pageButtons = btns;
      };
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Pager List Component'
  };
  _BLUEPRINTS.COMPONENTS.pagergrid = {
    "options": 'items[], page',
    "getElement": function (options) {
      var pane = new UIContainer();
      pane.pageContents = [];
      pane.items = options.items;
      pane.pages = Math.ceil(options.items.length / options.itemsPerPage);
      pane.page = options.page;
      pane.cols = options.cols;
      pane.gap = options.gap || 0;
      pane.itemsPerPage = options.itemsPerPage;
      pane.ticks = options.ticks;
      pane.refresh = function () {
        if (this.page == 1) {
          this.pageButtons.back.alpha = 0;
          this.pageButtons.back.interactive = false;
        } else {
          this.pageButtons.back.alpha = 1;
          this.pageButtons.back.interactive = true;
        }
        if (this.page == this.pages) {
          this.pageButtons.fwd.alpha = 0;
          this.pageButtons.fwd.interactive = false;
        } else {
          this.pageButtons.fwd.interactive = true;
          this.pageButtons.fwd.alpha = 1;
        }
        var startOffset = this.itemsPerPage * (this.page - 1);
        yOffset = 0;
        xOffset = 0;
        let colCount = 0;
        for (var i = startOffset; i < startOffset + this.itemsPerPage; i++) {
          if (this.items[i] == undefined) {
            break;
          }
          if (colCount === pane.cols) {
            yOffset += this.items[i].height + this.gap;
            xOffset = 0;
            colCount = 0;
          }
          colCount++;
          this.items[i].y = yOffset;
          this.items[i].x = xOffset;
          this.addChild(this.items[i]);
          xOffset += this.items[i].width + this.gap;
          this.pageContents.push(this.items[i]);
        }
      };
      pane.pageUp = function () {
        if (this.page == this.pages) {
          return false;
        }
        this.page++;
        if (!this.ticks) {
          this.empty();
          this.refresh();
        }
      };
      pane.pageDown = function () {
        if (this.page == 1) {
          return false;
        }
        this.page--;
        if (!this.ticks) {
          this.empty();
          this.refresh();
        }
      };
      pane.empty = function () {
        for (var i = 0; i < this.pageContents.length; i++) {
          this.removeChild(this.pageContents[i]);
        }
      };
      pane.addPageButtons = function (btns) {
        this.pageButtons = btns;
      };
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Pager Grid Component'
  };
  _BLUEPRINTS.COMPONENTS.component_stat_bar = {
    "getElement": function (options) {
      var container = new UIContainer();
      container;
      if (!options) {
        options = {
          watch: {
            'hp': 10,
            'maxHp': 100
          },
          key: 'hp',
          max: 'maxHp',
          w: 200,
          h: 30,
          fill: 0x009900,
          label: '',
          ticker: 1
        };
      }
      let ticker = options.ticker || 1;
      var stat = new TickerContainer(options, function () {
        let options = this.ref;
        let watch = options.watch;
        let w = options.w || 200;
        let h = options.h || 30;
        let max = watch[options.max] || 100;
        let key = options.key;
        let fill = options.fill || 0x990000;
        let label = options.label || '';
        let onePercent = max / 100;
        let value = watch[key];
        let percentDone = value / onePercent;
        label = label + percentDone + "%";
        if (this.stat) {
          this.stat.destroy();
        }
        this.stat = game.render.componentRaw('statBar', {
          callerObject: watch,
          valueKey: key,
          w: w,
          h: h,
          name: label,
          maxValue: max,
          value: value,
          fill: fill
        });
        this.addChild(this.stat);
      }, ticker);
      container.addChild(stat);
      return container;
    },
    "parent": 'component_outputs',
    "name": 'Refreshing Stat Bar'
  };
  _BLUEPRINTS.COMPONENTS.component_simplebutton = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      name = options.name || 'NONAME';
      value = options.value || '0';
      x = options.x || 0;
      y = options.y || 0;
      w = options.w || 250;
      h = options.h || 30;
      lblW = options.lblW || 150;
      var pane = new UIContainer();
      pane.width = w;
      pane.height = h;
      restW = w - lblW;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: lblW,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + lblW,
        y: y + 5,
        w: restW - 5,
        h: h - 10
      }));
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.x = x + 15;
      lbl1.y = -2 + h / 2;
      lbl1.anchor.set(0, 0.5);
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      lbl2 = game.render.text(value, 'ingame-label');
      lbl2.x = x + 15 + lblW;
      lbl2.y = 0 + h / 2;
      lbl2.anchor.set(0, 0.5);
      lbl2.alpha = 0.8;
      pane.addChild(lbl2);
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Simple Button'
  };
  _BLUEPRINTS.COMPONENTS.editableLabel = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      name = options.name || 'NONAME';
      value = options.value || '0';
      x = options.x || 0;
      y = options.y || 0;
      w = options.w || 250;
      h = options.h || 30;
      lblW = options.lblW || 150;
      var pane = new UIContainer();
      pane.width = w;
      pane.height = h;
      restW = w - lblW;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: lblW,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + lblW,
        y: y + 5,
        w: restW - 5,
        h: h - 10
      }));
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.x = x + 15;
      lbl1.y = -2 + h / 2;
      lbl1.anchor.set(0, 0.5);
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      lbl2 = game.render.componentRaw('component_text_input', {
        text: value,
        w: restW - 5,
        onChange: options.onChange
      });
      lbl2.x = x + 15 + lblW;
      lbl2.y = 0 + h / 2;
      lbl2.alpha = 0.8;
      pane.addChild(lbl2);
      pane.label = lbl1;
      pane.value = lbl2;
      pane.setLabel = function (newLabel) {
        this.label.text = newLabel;
      };
      pane.setValue = function (newValue) {
        this.value.text = newValue;
      };
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'editableLabel'
  };
  _BLUEPRINTS.COMPONENTS.drawIconLabel = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          sprite: 'sprite_campfire'
        };
      }
      let name = options.name || 'Wood';
      let value = options.value || '0';
      let x = options.x || 0;
      let y = options.y || 0;
      let w = options.w || 250;
      let h = options.h || 40;
      let lblW = options.lblW || 150;
      let sprite = options.sprite;
      const pane = new UIContainer();
      pane.width = w;
      pane.height = h;
      restW = w - lblW;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: lblW,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + lblW,
        y: y + 5,
        w: restW - 5,
        h: h - 10
      }));
      const icon = new ItemIcon(sprite);
      icon.scale.set(0.5);
      icon.x = 5.5;
      icon.y = 2.5;
      pane.addChild(icon);
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.x = icon.width + x + 9.5;
      lbl1.y = -2 + h / 2;
      lbl1.anchor.set(0, 0.5);
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      lbl2 = game.render.text(value, 'ingame-label');
      lbl2.x = x + 15 + lblW;
      lbl2.y = 0 + h / 2;
      lbl2.anchor.set(0, 0.5);
      lbl2.alpha = 0.8;
      pane.addChild(lbl2);
      pane.label = lbl1;
      pane.value = lbl2;
      pane.setLabel = function (newLabel) {
        this.label.text = newLabel;
      };
      pane.setValue = function (newValue) {
        this.value.text = newValue;
      };
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'drawIconLabel'
  };
  _BLUEPRINTS.COMPONENTS.component_text = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          text: 'Hello world!',
          style: 'info-tagline'
        };
      }
      let text = game.render.text(options.text);
      text.x = 0;
      text.y = 0;
      return text;
    },
    "parent": 'component_outputs',
    "name": 'Text'
  };
  _BLUEPRINTS.COMPONENTS.component_item_icon = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          icon: 'test_xbow',
          w: 64,
          h: 64,
          moveable: false
        };
      }
      const icon = new ItemIcon(options.icon, options);
      icon.x = 7;
      icon.y = 7;
      icon.interactive = false;
      return icon;
    },
    "parent": 'component_outputs',
    "name": 'Item Icon'
  };
  _BLUEPRINTS.COMPONENTS.drawLabel = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      name = options.name || 'Money';
      value = options.value || '100';
      x = options.x || 0;
      y = options.y || 0;
      w = options.w || 250;
      h = options.h || 30;
      lblW = options.lblW || 150;
      var pane = new UIContainer();
      pane.width = w;
      pane.height = h;
      restW = w - lblW;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: lblW,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + lblW,
        y: y + 5,
        w: restW - 5,
        h: h - 10
      }));
      lbl1 = game.render.text(name, 'ingame-label');
      lbl1.x = x + 15;
      lbl1.y = -2 + h / 2;
      lbl1.anchor.set(0, 0.5);
      lbl1.alpha = 0.8;
      pane.addChild(lbl1);
      lbl2 = game.render.text(value, 'ingame-label');
      lbl2.x = x + 15 + lblW;
      lbl2.y = 0 + h / 2;
      lbl2.anchor.set(0, 0.5);
      lbl2.alpha = 0.8;
      pane.addChild(lbl2);
      pane.label = lbl1;
      pane.value = lbl2;
      pane.setLabel = function (newLabel) {
        this.label.text = newLabel;
      };
      pane.setValue = function (newValue) {
        this.value.text = newValue;
      };
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Label'
  };
  _BLUEPRINTS.COMPONENTS.component_scrolling_text = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      options.text = options.text || "I am talkin...";
      options.w = options.w || 400;
      options.h = options.h || 40;
      options.delay = options.delay || 25;
      let text = options.text;
      let currentIndex = 0;
      let timer = null;
      const container = game.render.component('component_container_slim', {
        w: options.w,
        h: options.h
      });
      const textObj = game.render.text(" ", 'ingame-label');
      textObj.x = 10;
      textObj.y = 10;
      container.addChild(textObj);
      function startTextWriting() {
        timer = setInterval(revealNextLetter, options.delay);
      }
      function revealNextLetter() {
        textObj.text += text[currentIndex];
        currentIndex++;
        if (currentIndex === text.length) {
          clearInterval(timer);
        }
      }
      container.startWriting = function () {
        startTextWriting();
      };
      container.stopWriting = function () {
        clearInterval(timer);
      };
      container.restartWriting = function () {
        clearInterval(timer);
        textObj.text = "";
        currentIndex = 0;
        startTextWriting();
      };
      container.on('added', function () {
        startTextWriting();
      });
      container.on('removed', function () {
        clearInterval(timer);
      });
      return container;
    },
    "parent": 'component_outputs',
    "name": 'Scrolling Text'
  };
  _BLUEPRINTS.COMPONENTS.component_text_carousel = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      const defaultTopFill = '0x212121';
      const defaultButtonFill = '0x3d3d3d';
      const defaultBottomFill = '0x2A2A2A';
      const defaultTextFill = '0x3d3d3d';
      if (!options) {
        options = {};
      }
      options.w = options.w || 500;
      options.h = options.h || 500;
      const items = options.items || ['Title 1', 'Title 2', 'Title 3'];
      const bottomTexts = options.bottomTexts || ['Here is some example text', 'Example 2', 'Example 3'];
      let currentIndex = 0;
      const pane = new UIContainer();
      const topPane = new UIPane({
        fill: options.topFill || defaultTopFill,
        padding: 0,
        x: 0,
        y: 0,
        w: options.w,
        h: options.h * 0.2
      });
      pane.addChild(topPane);
      const title = game.render.text(items[currentIndex], 'ingame-label');
      title.anchor.set(0.5, -0.7);
      title.x = options.w / 2;
      title.y = 10;
      title.alpha = 0.8;
      topPane.addChild(title);
      const leftArrow = game.render.component('hud_button', {
        name: '<',
        w: 50,
        fill: options.buttonFill || defaultButtonFill
      });
      leftArrow.x = 10;
      leftArrow.y = title.y;
      topPane.addChild(leftArrow);
      const rightArrow = game.render.component('hud_button', {
        name: '>',
        w: 50,
        fill: options.buttonFill || defaultButtonFill
      });
      rightArrow.x = options.w - 60;
      rightArrow.y = title.y;
      topPane.addChild(rightArrow);
      const bottomPane = new UIPane({
        fill: options.bottomFill || defaultBottomFill,
        padding: 0,
        x: 0,
        y: title.y + 50,
        w: options.w,
        h: options.h * 0.8
      });
      pane.addChild(bottomPane);
      const textBox = new UIPane({
        fill: options.textFill || defaultTextFill,
        padding: 10,
        x: 10,
        y: 10,
        w: options.w - 20,
        h: options.h * 0.8 - 20
      });
      bottomPane.addChild(textBox);
      const text = game.render.text(bottomTexts[currentIndex] || 'Example Text', 'ingame-label');
      text.anchor.set(0, 0);
      text.x = 10;
      text.y = 10;
      text.alpha = 0.8;
      textBox.addChild(text);
      leftArrow.on('pointerup', function () {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = items.length - 1;
        }
        title.text = items[currentIndex];
        text.text = bottomTexts[currentIndex] || 'Example Text';
        pane.emit('change', currentIndex, items[currentIndex]);
      });
      rightArrow.on('pointerup', function () {
        currentIndex++;
        if (currentIndex >= items.length) {
          currentIndex = 0;
        }
        title.text = items[currentIndex];
        text.text = bottomTexts[currentIndex] || 'Example Text';
        pane.emit('change', currentIndex, items[currentIndex]);
      });
      return pane;
    },
    "parent": 'component_outputs',
    "name": 'Text Carousel'
  };
  _BLUEPRINTS.COMPONENTS.drawBoxPane = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      x = options.x || 0;
      y = options.y || 0;
      w = options.w || 500;
      h = options.h || 500;
      title = options.title || false;
      showX = options.showX || false;
      titleW = options.titleW || 180;
      titleH = options.titleH || 35;
      if (title) {
        titleW = options.titleW || Math.max(180, title.length * 10);
      }
      name = options.name || "NONAMEADDED";
      callerObject = options.callerObject || false;
      onClose = options.onClose || false;
      moveable = options.moveable || false;
      onTop = options.onTop || false;
      options.corner = options.corner || "none";
      background = options.bg === false || 'sprite_texture_scuff';
      var outer = new UIContainer('drawBoxPane');
      var pane = new UIContainer();
      outer.addChild(pane);
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: w - 10,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3c3c3c',
        padding: 5,
        x: x + 10,
        y: y + 10,
        w: w - 20,
        h: h - 20
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x434343',
        padding: 5,
        x: x + 15,
        y: y + 15,
        w: w - 30,
        h: h - 30
      }));
      if (background !== false) {
        var background = new Sprite(background);
        background.width = pane.width;
        background.height = pane.height;
        pane.addChild(background);
      }
      if (title != false) {
        x = 10;
        y = -15;
        pane.addChild(new UIPane({
          fullscreen: false,
          fill: '0x212121',
          padding: 0,
          x: x + 10,
          y: y,
          w: titleW,
          h: titleH
        }));
        pane.addChild(new UIPane({
          fullscreen: false,
          fill: '0x3c3c3c',
          padding: 0,
          x: x + 12.5,
          y: y + 1,
          w: titleW - 4,
          h: titleH - 4
        }));
        title = game.render.text(title, 'ingame-menu-title');
        title.x = x + 19;
        title.y = y + 4;
        title.alpha = 0.8;
        pane.addChild(title);
      }
      pane.cacheAsBitmap = true;
      var mover = new UIPane({
        fullscreen: false,
        fill: '0xFFFFFF',
        padding: 0,
        x: 0,
        y: 0,
        w: w - 5,
        h: h
      });
      mover.moves = outer;
      mover.alpha = 0;
      mover.isInteractive();
      if (moveable) {
        mover.on('pointerdown', function () {
          game.movingUI = this.moves;
          game.movingUI.isValid = true;
          game.movingUI.origMouseX = game.screenMouseX;
          game.movingUI.origMouseY = game.screenMouseY;
          game.movingUI.origX = this.moves.x;
          game.movingUI.origY = this.moves.y;
          game.movingUI.cacheAsBitmap = true;
        });
        game.setTicker('movingUI', function () {
          if (game.movingUI) {
            if (game.movingUI.isValid) {
              game.movingUI.x = game.movingUI.origX + (game.screenMouseX - game.movingUI.origMouseX);
              game.movingUI.y = game.movingUI.origY + (game.screenMouseY - game.movingUI.origMouseY);
            }
          }
        });
      }
      outer.addChild(mover);
      if (showX) {
        xButton = new UIContainer();
        xButton.addChild(new UIPane({
          fullscreen: false,
          fill: '0x212121',
          padding: 0,
          x: 0,
          y: 2,
          w: 25,
          h: 25
        }));
        xButton.addChild(new UIPane({
          fullscreen: false,
          fill: '0x3d3d3d',
          padding: 0,
          x: 2,
          y: 4,
          w: 21,
          h: 21
        }));
        xButton.isInteractive();
        xButton.pane = outer;
        xButton.callerObject = callerObject;
        xButton.onClose = onClose;
        xButton.on('pointerup', function () {
          this.pane.destroy();
          if (typeof this.onClose == 'function') {
            this.onClose(this.callerObject);
          }
        });
        xButton.x = options.w;
        xButton.y = 0;
        outer.addChild(xButton);
        xText = game.render.text('X', 'ingame-menu-title');
        xText.x = 5;
        xText.y = 0;
        xButton.addChild(xText);
        outer.close = xButton;
      }
      outer.isInteractive();
      if (onTop) {
        outer.on('pointerdown', function () {
          game.render.aboveAll.removeChild(this);
          game.render.aboveAll.addChild(this);
        });
      }
      outer.on('pointerdown', function (e) {
        e.stopPropagation();
        if (game.input.isRightClick(e)) {
          e.stopPropagation();
        }
      });
      if (options.corner == "one") {
        const corner = new Sprite('sprite_pane_corner_2');
        corner.y = h - 97;
        corner.x = -10;
        outer.addChild(corner);
      }
      if (options.corner == "both") {
        const corner = new Sprite('sprite_pane_corner_3');
        corner.y = h - 161;
        corner.x = -28;
        outer.addChild(corner);
      }
      if (options.corner == "telly" || options.corner == "telly_wire") {
        const corner = new Sprite('sprite_pane_corner_4');
        corner.y = h - 155;
        corner.x = -75;
        outer.addChild(corner);
      }
      if (options.corner == "telly" || options.corner == "telly_wire") {
        const corner = new Sprite('sprite_pane_corner_5');
        corner.y = h - 62;
        corner.x = w - 150;
        outer.addChild(corner);
      }
      if (options.corner == "wire_1") {
        const corner = new Sprite('sprite_pane_corner_8');
        corner.y = -10;
        corner.x = -60;
        outer.addChild(corner);
      }
      if (options.corner == "wire_3" || options.corner == "telly_wire") {
        const corner = new Sprite('sprite_pane_corner_6');
        corner.y = -30;
        corner.x = -63;
        outer.addChild(corner);
      }
      if (options.corner == "wire_right") {
        const corner = new Sprite('sprite_pane_corner_8');
        corner.y = -28;
        corner.x = w - 70;
        outer.addChild(corner);
      }
      if (options.corner == "wire_3" || options.corner == "wire_2" || options.corner == "wire_1") {
        const corner = new Sprite('sprite_pane_corner_7');
        corner.y = h - 70;
        corner.x = w - 100;
        outer.addChild(corner);
      }
      if (options.corner == "both") {
        const corner = new Sprite('sprite_pane_corner_1');
        corner.y = -33;
        corner.x = w - 200;
        outer.addChild(corner);
      }
      return outer;
    },
    "parent": 'component_containers',
    "name": 'drawBoxPane'
  };
  _BLUEPRINTS.COMPONENTS.component_container_slim = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      let x = options.x || 0;
      let y = options.y || 0;
      let w = options.w || 64;
      let h = options.h || 64;
      let title = options.title || false;
      const showX = options.showX || false;
      const titleW = options.titleW || 180;
      const titleH = options.titleH || 60;
      const name = options.name || "NONAMEADDED";
      if (title !== false) {
        y = y + titleH / 2;
      }
      const pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 2,
        x: x + 5,
        y: y + 5,
        w: w - 10,
        h: h - 10
      }));
      if (title != false) {
        pane.addChild(new UIPane({
          fullscreen: false,
          fill: '0x212121',
          padding: 10,
          x: x + 10,
          y: y - titleH / 2 + 5,
          w: titleW,
          h: titleH
        }));
        title = game.render.text(title, 'ingame-menu-title');
        title.x = x + 35;
        title.y = y - 10;
        title.alpha = 0.8;
        pane.addChild(title);
      }
      if (showX) {
        xButton = new UIContainer();
        xButton.addChild(new UIPane({
          fullscreen: false,
          fill: '0x212121',
          padding: 0,
          x: 0,
          y: 2,
          w: 25,
          h: 25
        }));
        xButton.addChild(new UIPane({
          fullscreen: false,
          fill: '0x3d3d3d',
          padding: 0,
          x: 2,
          y: 4,
          w: 21,
          h: 21
        }));
        xButton.isInteractive();
        xButton.name = name;
        xButton.on('pointerup', function () {
          game.ui.closeUI(this.name);
        });
        xButton.x = pane.width - 10;
        xButton.y = 45;
        pane.addChild(xButton);
        xText = game.render.text('X', 'ingame-menu-title');
        xText.x = 5;
        xText.y = 0;
        xButton.addChild(xText);
      }
      return pane;
    },
    "parent": 'component_containers',
    "name": 'Slim Container'
  };
  _BLUEPRINTS.COMPONENTS.squareWBorder = {
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      w = options.w || 64;
      h = options.h || 64;
      var pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: 0,
        y: 0,
        w: 1,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: 1
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: w,
        y: 0,
        w: 1,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 0,
        x: 0,
        y: h,
        w: w,
        h: 1
      }));
      return pane;
    },
    "parent": 'component_containers',
    "name": 'squareWBorder'
  };
  _BLUEPRINTS.COMPONENTS.component_container_tabs = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const tabNames = options.tabNames || ['tab1', 'tab2', 'tab3', 'new', 'brt', 'cod', 'hug', 'uhd'];
      const tabComponents = options.tabComponents || [game.render.component('hud_button', {
        name: 'hud1'
      }), game.render.component('hud_button', {
        name: 'hud2'
      }), game.render.component('hud_button', {
        name: 'hud3'
      })];
      const w = options.w || 500;
      const h = options.h || 300;
      const tabIndex = options.tabIndex || 0;
      const pane = new UIContainer();
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: 0,
        y: 0,
        w: w,
        h: h
      }));
      const tabContainer = new UIContainer();
      tabContainer.x = 0;
      tabContainer.y = 0;
      const contentContainer = new UIContainer();
      contentContainer.x = 0;
      contentContainer.y = 40;
      pane.addChild(tabContainer);
      pane.addChild(contentContainer);
      const tabWidth = w / tabNames.length;
      for (let i = 0; i < tabNames.length; i++) {
        const tabButton = game.render.component('hud_button', {
          name: tabNames[i],
          w: tabWidth,
          h: 40
        });
        tabButton.x = i * tabWidth;
        tabButton.on('pointerup', function () {
          showTab(i);
        });
        tabContainer.addChild(tabButton);
        if (i === tabIndex) {
          tabButton.alpha = 1;
        } else {
          tabButton.alpha = 0.5;
        }
        const component = tabComponents[i];
        if (component) {
          contentContainer.addChild(component);
          component.visible = i === tabIndex;
        }
      }
      function showTab(index) {
        for (let i = 0; i < tabNames.length; i++) {
          const tabButton = tabContainer.getChildAt(i);
          if (i === index) {
            tabButton.alpha = 1;
          } else {
            tabButton.alpha = 0.5;
          }
          const component = tabComponents[i];
          if (component) {
            component.visible = i === index;
          }
        }
      }
      return pane;
    },
    "parent": 'component_containers',
    "name": 'Tab Container'
  };
  _BLUEPRINTS.COMPONENTS.component_container_tabs2 = {
    "options": 'x, y, w, h, title, showX, titleW, titleH, name, callerObject, onClose, moveable',
    "getElement": function (options) {
      if (options == undefined) {
        options = {};
      }
      const tabNames = options.tabNames || ['Tab 1', 'Tab 2', 'Tab 2', 'Tab 2', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5'];
      const tabComponents = options.tabComponents || [game.render.component('hud_button'), game.render.component('hud_button', {
        name: 'Another tab'
      }), game.render.component('hud_button', {
        name: 'Yert Another tab'
      }), game.render.component('hud_button', {
        name: 'Noo Another tab'
      })];
      const w = options.w || 500;
      const h = options.h || 300;
      const container = new UIContainer();
      container.width = w;
      container.height = h;
      const tabButtons = [];
      const tabContents = [];
      const tabButtonContainer = new UIContainer();
      tabButtonContainer.width = w;
      tabButtonContainer.height = 40;
      tabButtonContainer.y = 0;
      const tabContentContainer = new UIContainer();
      tabContentContainer.width = w;
      tabContentContainer.height = h - 40;
      tabContentContainer.y = 40;
      for (let i = 0; i < tabNames.length; i++) {
        const tabButton = game.render.component('hud_button', {
          name: tabNames[i],
          w: w / tabNames.length,
          h: 40,
          onClick: function () {
            showTab(i);
          }
        });
        tabButton.x = i * (w / tabNames.length);
        tabButtonContainer.addChild(tabButton);
        tabButtons.push(tabButton);
        const tabContent = new UIContainer();
        tabContent.width = w;
        tabContent.height = h - 40;
        tabContent.visible = false;
        tabContents.push(tabContent);
        tabContentContainer.addChild(tabContent);
      }
      container.addChild(tabButtonContainer);
      container.addChild(tabContentContainer);
      function showTab(index) {
        for (let i = 0; i < tabContents.length; i++) {
          if (i === index) {
            tabContents[i].visible = true;
          } else {
            tabContents[i].visible = false;
          }
        }
      }
      if (tabComponents.length > 0) {
        for (let i = 0; i < tabComponents.length; i++) {
          const tabContent = tabContents[i];
          tabContent.addChild(tabComponents[i]);
        }
        showTab(0);
      }
      return container;
    },
    "parent": 'component_containers',
    "name": 'Tab Container 2'
  };
  _BLUEPRINTS.COMPONENTS.component_playerresources = {
    "getElement": function (options) {
      var container = new UIContainer();
      var listItem = new TickerContainer(container, function (container) {
        if (container.listItem) {
          container.listItem.destroy();
        }
        var mulch = game.p.data.stats.mulch || 0;
        var stone = game.p.data.stats.stone || 0;
        var components = game.p.data.stats.components || 0;
        var adhesive = game.p.data.stats.adhesives || 0;
        var wood = game.p.data.stats.wood || 0;
        var fabric = game.p.data.stats.fabric || 0;
        var list = [game.render.component('drawLabel', {
          name: 'Wood',
          value: game.format(wood)
        }), game.render.component('drawLabel', {
          name: 'Stone',
          value: game.format(stone)
        }), game.render.component('drawLabel', {
          name: 'Fabric',
          value: game.format(fabric)
        }), game.render.component('drawLabel', {
          name: 'Adhesive',
          value: game.format(adhesive)
        }), game.render.component('drawLabel', {
          name: 'Mulch',
          value: game.format(mulch)
        }), game.render.component('drawLabel', {
          name: 'Components',
          value: game.format(components)
        })];
        var column = game.render.componentRaw('pager', {
          items: list,
          itemsPerPage: 6
        });
        container.listItem = column;
        this.addChild(column);
      }, 0.5);
      container.addChild(listItem);
      return container;
    },
    "parent": 'component_composites',
    "name": 'List Craft Resources'
  };
  _BLUEPRINTS.COMPONENTS.component_blueprint = {
    "options": 'recipe',
    "getElement": function (options) {
      if (!options) {
        options = {
          name: 'pickaxe',
          recipe: _BLUEPRINTS.RECIPES['recipe_pickaxe']
        };
      }
      var recipe = options.recipe;
      var pane = new UIContainer();
      var w = 84;
      var h = 84;
      var x = 0;
      var y = 0;
      var spriteW = 64;
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 0,
        x: x,
        y: y,
        w: w,
        h: h
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x3d3d3d',
        padding: 5,
        x: x + 5,
        y: y + 5,
        w: w - 10,
        h: h - 10
      }));
      pane.addChild(new UIPane({
        fullscreen: false,
        fill: '0x212121',
        padding: 5,
        x: x + 10,
        y: y + 10,
        w: 64,
        h: 64
      }));
      var icon = new ItemIcon(recipe.crafts, {
        w: 64,
        h: 64,
        moveable: false
      });
      icon.x = 7;
      icon.y = 7;
      icon.interactive = false;
      pane.addChild(icon);
      var icon = new ItemIcon('ss_item_bp_' + options.name, {
        w: 64,
        h: 64,
        moveable: false
      });
      icon.x = 7;
      icon.y = 7;
      icon.alpha = 0.05;
      pane.addChild(icon);
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Component Blueprint'
  };
  _BLUEPRINTS.COMPONENTS.drawLoadFile = {
    "options": 'loadFile, type=new|load, slot',
    "getElement": function (options) {
      if (!options) {
        options = {
          loadFile: {
            date: Date.now(),
            name: "Some name"
          }
        };
      }
      if (!options.type) {
        options.type = 'load';
      }
      if (options.loadFile && options.loadFile.date) {
        if (options.type == 'new') {
          options.type = 'overwrite';
        }
      }
      var typeTitles = {
        new: 'Start',
        overwrite: 'Load',
        load: 'Load'
      };
      var title = typeTitles[options.type];
      var file = options.loadFile;
      if (!file.date) {
        file = undefined;
      } else {
        file.date = new Date(file.date);
      }
      var w = options.w || 450;
      var pane = new UIContainer();
      var container = new UIContainer();
      pane.addChild(container);
      container.x = 30;
      container.y = 10;
      if (file) {
        var text = game.render.text(file.name + "\nLast save: " + file.date.toLocaleDateString() + " " + file.date.toLocaleTimeString(), 'ingame-label');
      } else {
        var text = game.render.text("No save present", 'ingame-label');
      }
      text.y = 10;
      text.x = 0;
      container.addChild(text);
      if (options.type == 'load') {
        if (file) {
          var btn = game.render.component('hud_button', {
            name: title,
            corner: true
          });
          container.addChild(btn);
          btn.x = w - btn.width - 50;
          btn.y = 9;
          btn.isInteractive();
          btn.options = options;
          btn.on('pointerup', function () {
            game.loading = true;
            if (game.index.getIndex('open_components')['frontMenu']) {
              game.index.getIndex('open_components')['frontMenu'].destroy();
            }
            let index = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
            let saveFile = game.grid.saveGames[this.options.slot];
            let x = Math.abs(Math.ceil(saveFile.viewport.px / 64 / 10));
            let y = Math.abs(Math.ceil(saveFile.viewport.py / 64 / 10));
            window.location.href = index + `?x=${x}&y=${y}&test=true&type=component&unit=component_loadfile&map=live&load=${this.options.slot}`;
          });
        }
      } else {
        var btn = game.render.component('hud_button', {
          name: title,
          corner: true
        });
        container.addChild(btn);
        text.alpha = 0;
        btn.x = w - btn.width - 50;
        btn.y = 9;
        btn.options = options;
        btn.on('pointerup', function () {
          game.index.getIndex('open_components')['frontMenu'].destroy();
          game.ee.emit('newgame-clicked', this.options);
        });
      }
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Draw Load File'
  };
  _BLUEPRINTS.COMPONENTS.component_list_queue = {
    "options": 'itemWithQueue',
    "getElement": function (options) {
      if (!options) {
        options = new ComplexItem('pers_worlditem_smelter');
        if (typeof options.onCreate == 'function') {
          options.onCreate({});
        }
        options.queue = {
          data: {}
        };
        options.queue.data.list = [{
          recipe: "ss_item_metalingot",
          duration: 10000,
          startedTime: false
        }, {
          recipe: "ss_item_metalingot",
          duration: 10000,
          startedTime: false
        }, {
          recipe: "ss_item_metalingot",
          duration: 10000,
          startedTime: false
        }, {
          recipe: "ss_item_metalingot",
          duration: 10000,
          startedTime: false
        }];
      }
      let w = options.w || 450;
      let h = options.h || 450;
      var pane = new UIContainer();
      var column = new TickerContainer(options, function (item) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (let i = 0; i < item.queue.data.list.length; i++) {
          let listItem = item.queue.data.list[i];
          list.push(game.render.componentRaw('component_list_item_queue', {
            w: w,
            recipe: listItem.recipe,
            started: listItem.startedTime,
            duration: listItem.duration,
            queue: item.queue,
            queueIndex: i
          }));
        }
        this.pane = new UIPane({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 0,
          w: w + 10,
          h: h
        });
        let pager = game.render.componentRaw('pager', {
          rowHeight: 50,
          ticks: true,
          page: page,
          width: w,
          items: list,
          itemsPerPage: 7
        });
        pager.x = -5;
        pager.y = 10;
        if (this.pager) {
          this.pager.destroy();
        }
        this.pager = pager;
        this.pane.addChild(pager);
        this.addChild(this.pane);
      }, 0.25);
      column.lastRecipe = 'whatever';
      pane.addChild(column);
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Crafting Queue List'
  };
  _BLUEPRINTS.COMPONENTS.component_newstarthud = {
    "options": 'itemWithQueue',
    "getElement": function (options) {
      if (!options) {
        options = new ComplexItem('worlditem_craftingbench');
        if (typeof options.onCreate == 'function') {
          options.onCreate({});
        }
        options.data.queue = {
          data: {}
        };
        options.data.queue.data.list = [{
          name: 'Super Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }, {
          name: 'Deep Shotgun',
          duration: 10000,
          startedTime: false
        }];
      }
      let w = options.w || 450;
      let h = options.h || 450;
      const pane = new UIContainer();
      let column = new TickerContainer(options, function (item) {
        let page = 1;
        if (this.pager && this.pager.pages) {
          page = this.pager.pages.page;
        }
        let list = [];
        for (let i = 0; i < item.data.queue.data.list.length; i++) {
          let listItem = item.data.queue.data.list[i];
          list.push(game.render.componentRaw('component_list_item_queue', {
            w: w,
            label: listItem.name,
            started: listItem.startedTime,
            duration: listItem.duration,
            queue: item.data.queue,
            queueIndex: i
          }));
        }
        this.pane = new UIPane({
          fullscreen: false,
          fill: '0x303030',
          padding: 0,
          x: -10,
          y: 0,
          w: w + 10,
          h: h
        });
        let pager = game.render.componentRaw('pager', {
          rowHeight: 50,
          ticks: true,
          page: page,
          width: w,
          items: list,
          itemsPerPage: 7
        });
        pager.x = -5;
        pager.y = 10;
        if (this.pager) {
          this.pager.destroy();
        }
        this.pager = pager;
        this.pane.addChild(pager);
        this.addChild(this.pane);
      }, 0.25);
      column.lastRecipe = 'whatever';
      pane.addChild(column);
      return pane;
    },
    "parent": 'component_composites',
    "name": 'New Start Selector'
  };
  _BLUEPRINTS.COMPONENTS.component_raceselector = {
    "getElement": function (options) {
      game.playerSelect = {};
      game.playerSelect.onClick = function () {
        game.notify("PLAYING DEMO ONLY\nYOU WILL ALWAYS SPAWN AS A CLONE");
        game.playerSelect.pic1.alpha = 0.25;
        game.playerSelect.pic2.alpha = 0.25;
        game.playerSelect.pic3.alpha = 0.25;
        game.playerSelect.pic4.alpha = 0.25;
        game.playerSelect.pic5.alpha = 0.25;
        game.playerSelect.pic6.alpha = 0.25;
        game.playerSelect.pic7.alpha = 0.25;
        game.playerSelect.pic8.alpha = 0.25;
        game.startType = this.data.name.toLowerCase();
        game.playerSelect.clicked = this.data.name;
        this.alpha = 1;
      };
      let spacer = 100;
      let w = 450;
      let h = 140 * 2;
      game.playerSelect.onHover = function () {
        var pane = game.render.component('itemui_fulldescriptor', {
          w: 450,
          showX: false,
          noMoney: true,
          readName: this.data.name,
          data: {},
          meta: {
            description: this.description
          }
        }, 'hover-item');
        game.playerSelect.pane.addChild(pane);
        pane.y = h + 15;
      };
      var pane = game.render.componentRaw('drawBoxPane', {
        title: false,
        moveable: false,
        w: w,
        h: h,
        showX: false,
        corner: "wire_3"
      });
      let player = new LifeObject();
      player.setWep({
        sprite: 'blank',
        data: {
          stance: 'none'
        }
      });
      player.setBackWep({
        sprite: 'blank'
      });
      player.setMask({
        sprite: 'blank'
      });
      player.setBody({
        sprite: 'body_naked'
      });
      player.setBackpack({
        sprite: 'blank'
      });
      var npcPic1 = player.cloneForUI();
      npcPic1.y = 30;
      npcPic1.x = 40;
      npcPic1.setAnim('none/idle_down');
      npcPic1.data.name = 'Clone';
      npcPic1.showNameTag();
      pane.addChild(npcPic1);
      npcPic1.alpha = 1;
      npcPic1.isInteractive();
      npcPic1.description = "A basic servant of SinCorp, clones are the real experience of the desert. Experience the harsh reality of the desert with this game start`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: None";
      npcPic1.on('pointerdown', game.playerSelect.onClick);
      npcPic1.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic1 = npcPic1;
      var npcPic2 = player.cloneForUI();
      npcPic2.data.name = "Human";
      npcPic2.setMask({
        sprite: 'mask_bandit_hatmask'
      });
      npcPic2.setBody({
        sprite: 'body_smoker'
      });
      npcPic2.setAnim('none/idle_down');
      npcPic2.showNameTag();
      pane.addChild(npcPic2);
      npcPic2.x += 40 + spacer;
      npcPic2.y = 30;
      npcPic2.alpha = 0.25;
      npcPic2.isInteractive();
      npcPic2.description = "The royalty of the desert in their own eyes. The humans are stronger than clones and survive much easier in the desert although still have weaknesses to much of nature`n`nHP: 100`nRecovery: +0.25ms`nFatigue Loss: -0.20ms`nBuffs: Human`nDebuffs: None";
      npcPic2.on('pointerdown', game.playerSelect.onClick);
      npcPic2.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic2 = npcPic2;
      var npcPic3 = player.cloneForUI();
      npcPic3.data.name = "Robot";
      npcPic3.setAnim('none/idle_down');
      game.render.spine.hackSpineSlot('head_down', npcPic3.spine, game.render.getSpriteTexture('blank'));
      game.render.spine.hackSpineSlot('hand', npcPic3.spine, game.render.getSpriteTexture('blank'));
      game.render.spine.hackSpineSlot('hand2', npcPic3.spine, game.render.getSpriteTexture('blank'));
      npcPic3.setMask({
        sprite: 'mask_spherehead'
      });
      npcPic3.setBody({
        sprite: 'body_robot_slim'
      });
      npcPic3.showNameTag();
      pane.addChild(npcPic3);
      npcPic3.x += 40 + spacer * 2;
      npcPic3.y = 30;
      npcPic3.alpha = 0.25;
      npcPic3.isInteractive();
      npcPic3.description = "Charged by batteries to keep going longer, Robots make great but expensive workers. They have limited armor but can last much longer in the desert with batteries`n`nHP: 200`nRecovery: +0.1ms`nPower Loss: -0.30ms`nBuffs: Power grid`nDebuffs: None";
      npcPic3.on('pointerdown', game.playerSelect.onClick);
      npcPic3.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic3 = npcPic3;
      var npcPic4 = player.cloneForUI();
      npcPic4.data.name = "Lokal";
      npcPic4.setAnim('none/idle_down');
      npcPic4.setMask({
        sprite: 'mask_lokal'
      });
      npcPic4.setBody({
        sprite: 'body_camo'
      });
      npcPic4.showNameTag();
      pane.addChild(npcPic4);
      npcPic4.x += 40 + spacer * 3;
      npcPic4.y = 30;
      npcPic4.alpha = 0.25;
      npcPic4.isInteractive();
      npcPic4.description = "These natives are extremely hardy. They are enemies to SinCorp and so this is a harder play through balanced by powerful base stats`n`nHP: 200`nRecovery: +0.5ms`nFatigue Loss: -0.10ms`nBuffs: Hardy`nDebuffs: None";
      npcPic4.on('pointerdown', game.playerSelect.onClick);
      npcPic4.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic4 = npcPic4;
      var npcPic5 = player.cloneForUI();
      npcPic5.setMask({
        sprite: 'sprite_skinbothead'
      });
      npcPic5.setBody({
        sprite: 'body_robot_box'
      });
      npcPic5.y = 30 + 120;
      npcPic5.x = 40;
      npcPic5.setAnim('none/idle_down');
      npcPic5.data.name = 'Skinbot';
      npcPic5.showNameTag();
      pane.addChild(npcPic5);
      npcPic5.alpha = 0.25;
      npcPic5.isInteractive();
      npcPic5.description = "A robot that wants to be a human. People won't like looking at you so prepare to be lonely.`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: None";
      npcPic5.on('pointerdown', game.playerSelect.onClick);
      npcPic5.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic5 = npcPic5;
      var npcPic6 = player.cloneForUI();
      npcPic6.setMask({
        sprite: 'mask_steamglasses'
      });
      npcPic6.setBody({
        sprite: 'body_clonejacket2'
      });
      npcPic6.y = 30 + 120;
      npcPic6.x = 40 + spacer;
      npcPic6.setAnim('none/idle_down');
      npcPic6.data.name = 'Bob';
      npcPic6.showNameTag();
      pane.addChild(npcPic6);
      npcPic6.alpha = 0.25;
      npcPic6.isInteractive();
      npcPic6.description = "Bob is a Human who runs the cloning facilities at SynCorp. Get a kick start and help him fix the problematic mutation plaguing the cloning chambers.`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: None";
      npcPic6.on('pointerdown', game.playerSelect.onClick);
      npcPic6.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic6 = npcPic6;
      var npcPic7 = player.cloneForUI();
      game.render.spine.hackSpineSlot("head_right", npcPic7.spine, game.render.getSpriteTexture('blank'));
      npcPic7.setBody({
        sprite: 'body_mantis_red'
      });
      npcPic7.y = 30 + 120;
      npcPic7.x = 40 + spacer + spacer;
      npcPic7.setAnim('aim/idle_right');
      npcPic7.data.name = 'Mantis';
      npcPic7.showNameTag();
      pane.addChild(npcPic7);
      npcPic7.alpha = 0.25;
      npcPic7.isInteractive();
      npcPic7.description = "A creepy mantis, people won't like this thing being around but atleast it's strong.`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: None";
      npcPic7.on('pointerdown', game.playerSelect.onClick);
      npcPic7.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic7 = npcPic7;
      var npcPic8 = player.cloneForUI();
      game.render.spine.hackSpineSlot("head_right", npcPic8.spine, game.render.getSpriteTexture('blank'));
      npcPic8.setBody({
        sprite: 'body_tick'
      });
      npcPic8.y = 30 + 120;
      npcPic8.x = 40 + spacer + spacer + spacer;
      npcPic8.setAnim('aim/idle_right');
      npcPic8.data.name = 'Sandtick';
      npcPic8.showNameTag();
      pane.addChild(npcPic8);
      npcPic8.alpha = 0.25;
      npcPic8.isInteractive();
      npcPic8.description = "A rather small and weak sandtick... Good luck!`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: Crap";
      npcPic8.on('pointerdown', game.playerSelect.onClick);
      npcPic8.on('pointerover', game.playerSelect.onHover);
      game.playerSelect.pic8 = npcPic8;
      game.playerSelect.pane = pane;
      var desc = game.render.component('itemui_fulldescriptor', {
        w: 450,
        showX: false,
        noMoney: true,
        readName: npcPic1.data.name,
        data: {},
        meta: {
          description: npcPic1.description
        }
      }, 'hover-item');
      game.playerSelect.pane.addChild(desc);
      desc.y = 150;
      desc.y = h + 15;
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Race Selector'
  };
  _BLUEPRINTS.COMPONENTS.component_mapselector = {
    "getElement": function (options) {
      if (!options) {
        options = {};
      }
      game.mapSelect = {};
      let hackPawn = function (pawn, sprite) {
        game.render.spine.hackSpineSlot('head_down', pawn.spine, game.render.getSpriteTexture('blank'));
        game.render.spine.hackSpineSlot('body_down', pawn.spine, game.render.getSpriteTexture(sprite));
        game.render.spine.hackSpineSlot('hand', pawn.spine, game.render.getSpriteTexture('blank'));
        game.render.spine.hackSpineSlot('hand2', pawn.spine, game.render.getSpriteTexture('blank'));
      };
      game.mapSelect.onClick = function () {
        game.notify("PLAYING DEMO ONLY\nYOU WILL ALWAYS SPAWN IN THE DESERT");
        game.mapSelect.pic1.alpha = 0.25;
        game.mapSelect.pic2.alpha = 0.25;
        game.mapSelect.pic3.alpha = 0.25;
        game.mapSelect.clicked = this.data.name;
        this.alpha = 1;
      };
      game.mapSelect.onHover = function () {};
      let spacer = 140;
      let w = 450;
      let h = 140;
      var pane = game.render.componentRaw('drawBoxPane', {
        title: !options.title ? false : options.title,
        moveable: false,
        w: w,
        h: h,
        showX: false
      });
      let player = new LifeObject();
      var npcPic1 = player.cloneForUI();
      npcPic1.y = 30;
      npcPic1.x = 50;
      npcPic1.setAnim('none/idle_down');
      npcPic1.data.name = 'Desert';
      npcPic1.showNameTag();
      pane.addChild(npcPic1);
      npcPic1.alpha = 1;
      hackPawn(npcPic1, 'sprite_mapicon_desert');
      npcPic1.isInteractive();
      npcPic1.description = "A basic servant of SinCorp, clones are the real experience of the desert. Experience the harsh reality of the desert with this game start`n`nHP: 100`nRecovery: +0.20ms`nFatigue Loss: -0.25ms`nBuffs: None`nDebuffs: None";
      npcPic1.on('pointerdown', game.mapSelect.onClick);
      npcPic1.on('pointerover', game.mapSelect.onHover);
      game.mapSelect.pic1 = npcPic1;
      var npcPic2 = player.cloneForUI();
      npcPic2.data.name = "Winter";
      npcPic2.setAnim('none/idle_down');
      npcPic2.showNameTag();
      pane.addChild(npcPic2);
      npcPic2.x += 50 + spacer;
      npcPic2.y = 30;
      npcPic2.alpha = 0.25;
      npcPic2.isInteractive();
      hackPawn(npcPic2, 'sprite_mapicon_winter');
      npcPic2.description = "The royalty of the desert in their own eyes. The humans are stronger than clones and survive much easier in the desert although still have weaknesses to much of nature`n`nHP: 100`nRecovery: +0.25ms`nFatigue Loss: -0.20ms`nBuffs: Human`nDebuffs: None";
      npcPic2.on('pointerdown', game.mapSelect.onClick);
      npcPic2.on('pointerover', game.mapSelect.onHover);
      game.mapSelect.pic2 = npcPic2;
      var npcPic3 = player.cloneForUI();
      npcPic3.data.name = "Ashland";
      npcPic3.setAnim('none/idle_down');
      npcPic3.showNameTag();
      pane.addChild(npcPic3);
      npcPic3.x += 50 + spacer * 2;
      npcPic3.y = 30;
      npcPic3.alpha = 0.25;
      npcPic3.isInteractive();
      hackPawn(npcPic3, 'sprite_mapicon_ash');
      npcPic3.description = "Charged by batteries to keep going longer, Robots make great but expensive workers. They have limited armor but can last much longer in the desert with batteries`n`nHP: 200`nRecovery: +0.1ms`nPower Loss: -0.30ms`nBuffs: Power grid`nDebuffs: None";
      npcPic3.on('pointerdown', game.mapSelect.onClick);
      npcPic3.on('pointerover', game.mapSelect.onHover);
      game.mapSelect.pic3 = npcPic3;
      game.mapSelect.pane = pane;
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Map Selector'
  };
  _BLUEPRINTS.COMPONENTS.component_difficulty_toggles = {
    "getElement": function () {
      let w = 400;
      let h = 800;
      var container = new UIContainer();
      var pane = new UIContainer();
      container.addChild(pane);
      pane.x = 0;
      pane.y = 0;
      let volume = game.render.text('XP Multiplier', 'ingame-label');
      pane.addChild(volume);
      volume.y = 0;
      volume.x = 0;
      var audio = game.render.componentRaw('hud_counter', {
        w: 50,
        ref: game.session.data.settings,
        value: 'xpMulti',
        max: 5,
        min: 1
      });
      pane.addChild(audio);
      audio.y = 20;
      let loot = game.render.text('Loot Multiplier', 'ingame-label');
      pane.addChild(loot);
      loot.y = 0;
      loot.x = 190;
      var loot2 = game.render.componentRaw('hud_counter', {
        w: 50,
        ref: game.session.data.settings,
        value: 'lootMulti',
        max: 5,
        min: 1
      });
      pane.addChild(loot2);
      loot2.y = 20;
      loot2.x = 190;
      let cash = game.render.text('Stating Cash', 'ingame-label');
      pane.addChild(cash);
      cash.y = 70;
      cash.x = 0;
      var cash2 = game.render.componentRaw('hud_counter', {
        w: 240,
        ref: game.session.data.settings,
        value: 'startingCash',
        max: 10000,
        min: 10,
        multi: 100
      });
      pane.addChild(cash2);
      cash2.y = 90;
      cash2.x = 0;
      let booleans = ['trading', 'talking', 'building', 'crafting', 'squads', 'map'];
      let descs = ['Trading allowed`nAbility to trade', 'Talking allowed`nAbility to talk', 'Building allowed`nAbility to build', 'Crafting allowed`nAbility to craft', 'Squads allowed`nAbility to add members', 'Map allowed`nAbility to open the map'];
      let padding = 10;
      let offsetX = 0;
      let offsetY = 50 + 20 + 20 + 60;
      for (let i = 0; i < booleans.length; i++) {
        let value = booleans[i];
        let desc = descs[i];
        var setting = game.render.componentRaw('drawBoxPane', {
          moveable: false,
          w: w - 50,
          h: 75,
          showX: false,
          corner: "wire_right"
        });
        pane.addChild(setting);
        setting.y = offsetY;
        let text = game.render.text(desc, 'ingame-label');
        setting.addChild(text);
        text.x = 20;
        text.y = 20;
        let checkbox = game.render.component('hud_checkbox', {
          w: 100,
          value: value,
          isEnabled: function () {
            return game.session.data.settings[this.value];
          },
          onDisable: function () {
            game.session.data.settings[this.value] = false;
          },
          onEnable: function () {
            game.session.data.settings[this.value] = true;
          }
        });
        checkbox.y = 17.5;
        checkbox.x = setting.x + setting.width - 15 - checkbox.width - 70;
        setting.addChild(checkbox);
        offsetY += setting.height - 50;
      }
      return container;
    },
    "parent": 'component_composites',
    "name": 'Difficulty Toggles'
  };
  _BLUEPRINTS.COMPONENTS.component_spawnloc_picker = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      return new TickerContainer({}, function () {
        if (options) {
          this.options = options;
        }
        if (!options && this.options) {
          options = this.options;
        }
        if (!options) {
          options = {
            w: 400
          };
        }
        if (this.newSpawnPoint) {
          this.spawnPoint = this.newSpawnPoint;
        }
        if (!this.spawnPoint) {
          this.newSpawnPoint = 'default';
        }
        let spawnPoints = {
          'default': 'Desert (Colony Builder)',
          'landzo': 'Landzo City (Lore start)',
          'north': 'Northlands (Farmer start)',
          'east': 'Boglands (Rebel start)'
        };
        let spawnPointsLoc = {
          'default': [81, 52],
          'landzo': [67, 88],
          'north': [80, 25],
          'west': [25, 88]
        };
        game.spawnPoint = spawnPointsLoc[this.spawnPoint];
        let w = options.w;
        let list = [];
        for (let name in spawnPoints) {
          list.push(game.render.component('hud_checkbox', {
            name: spawnPoints[name],
            w: w,
            isEnabled: () => {
              return this.spawnPoint == name;
            },
            onEnable: () => {
              this.newSpawnPoint = name;
            },
            onDisable: () => {
              return false;
            }
          }));
        }
        var pane = new UIContainer();
        let title = game.render.text("Spawn zone");
        title.x = 0;
        pane.addChild(title);
        let pager = game.render.componentRaw('pager', {
          ticks: false,
          page: 1,
          width: w,
          items: list,
          itemsPerPage: list.length
        });
        pager.y = 25;
        pane.addChild(pager);
        this.addChild(pane);
      }, function () {
        return this.spawnPoint == this.newSpawnPoint;
      });
    },
    "parent": 'component_composites',
    "name": 'Spawn Location Picker'
  };
  _BLUEPRINTS.COMPONENTS.component_status_effects = {
    "options": 'name, value, x, y, w, h, lblW',
    "getElement": function (options) {
      if (!options) {
        options = {
          life: new LifeObject()
        };
        options.life.addStatusFromClient('dead', {
          duration: 10000
        });
        options.life.addStatusFromClient('bleed', {
          duration: 100
        });
        options.life.addStatusFromClient('dead', {
          duration: 5000000
        });
        options.life.addStatusFromClient('bleed', {
          duration: 100000
        });
        options.life.addStatusFromClient('dead', {
          duration: 100
        });
        options.life.addStatusFromClient('bleed', {
          duration: 100
        });
      }
      options.w = options.w || 200;
      options.h = options.h || 52;
      const life = options.life;
      const getEffects = life => {
        var keys = Object.keys(life.statuses);
        let statuses = [];
        if (keys.length == 0) {
          return statuses;
        }
        for (var i = 0; i < keys.length; i++) {
          let status = life.statuses[keys[i]];
          let statusData = ABE._BLUEPRINTS._STATUSES["c_effect_" + status.status];
          if (!statusData) {
            continue;
          }
          statuses.unshift({
            ...statusData,
            ...status
          });
        }
        return statuses;
      };
      const pan = new UIPane({
        fill: '0x444e4f'
      });
      pan.width = options.w;
      pan.height = options.h - 12;
      const pane = new UIContainer();
      pane.addChild(pan);
      let currentPage = 0;
      const nextButton = game.render.component('hud_button', {
        name: '>',
        w: 20,
        fill: '0x3d3d3d',
        onClick: function () {
          if (this.alpha !== 1) return;
          currentPage++;
          updateStatusEffects();
        }
      });
      nextButton.x = options.w - 20;
      nextButton.y = 0;
      pane.addChild(nextButton);
      const prevButton = game.render.component('hud_button', {
        name: '<',
        w: 20,
        fill: '0x3d3d3d',
        onClick: function () {
          if (this.alpha !== 1) return;
          currentPage--;
          updateStatusEffects();
        }
      });
      prevButton.x = 0;
      prevButton.y = 0;
      pane.addChild(prevButton);
      const updateStatusEffects = function () {
        const statusEffects = getEffects(life);
        pane.visible = false;
        const maxStatusEffectsPerPage = 4;
        const totalPages = Math.ceil(statusEffects.length / maxStatusEffectsPerPage);
        if (totalPages === 0) {
          currentPage = 0;
        }
        const startIndex = currentPage * maxStatusEffectsPerPage;
        const endIndex = Math.min(startIndex + maxStatusEffectsPerPage, statusEffects.length);
        let xOffset = 21;
        for (let i = startIndex; i < endIndex; i++) {
          pane.visible = true;
          const statusEffect = statusEffects[i];
          const statusIcon = new Sprite(statusEffect.sprite);
          statusIcon.scale.set(0.5);
          statusIcon.x = xOffset;
          statusIcon.y = 4;
          statusIcon.status = statusEffect;
          this.addChild(statusIcon);
          statusIcon.isInteractive();
          statusIcon.on('pointerup', function () {
            const statusEffect = this.status;
            let endTime = statusEffect.startTime + statusEffect.options.duration * 1000;
            const timeLeft = endTime - game.ts;
            const timeLeftString = Math.floor(timeLeft / 1000) + "s";
            const desc = _BLUEPRINTS._STATUSES['c_effect_' + statusEffect.status].description || '';
            let info = desc + "\nStatus: " + statusEffect.name;
            info = info + "\nDuration: " + statusEffect.options.duration + "s";
            info = info + "\nTime left: " + timeLeftString;
            info = info + "\nStacks: " + statusEffect.stacks;
            game.notify(info);
          });
          let endTime = statusEffect.startTime + statusEffect.options.duration * 1000;
          const timeLeft = endTime - game.ts;
          const timeLeftString = Math.floor(timeLeft / 1000) + "s";
          let time = game.render.text(timeLeftString, 'item-name-1');
          time.scale.set(0.8);
          time.anchor.set(0.5);
          time.x = statusIcon.x + 10;
          time.y = statusIcon.y + 2;
          if (timeLeft < Infinity) {
            this.addChild(time);
          }
          xOffset += statusIcon.width + 10;
        }
        nextButton.alpha = 0.5;
        prevButton.alpha = 0.5;
        if (totalPages > 1) {
          nextButton.alpha = currentPage < totalPages - 1 ? 1 : 0.5;
          prevButton.alpha = currentPage > 0 ? 1 : 0.5;
        }
      };
      const statusContainer = new TickerContainer(options.life, updateStatusEffects, 0.5);
      statusContainer.x = 0;
      statusContainer.y = 0;
      pane.addChild(statusContainer);
      return pane;
    },
    "parent": 'component_composites',
    "name": 'Status Effects'
  };
  _BLUEPRINTS.COMPONENTS.component_npc_talker = {
    "options": 'loadFile, type=new|load, slot',
    "getElement": function (options) {
      if (options == undefined) {
        options = {
          text: "Hello I am Adam, Iam long text, i am test which is long, it is long"
        };
      }
      lbl2 = game.render.text(options.text, 'ingame-label');
      value = options.value || 0;
      x = options.x || 0;
      y = options.y || 0;
      w = lbl2.width + 75;
      lblW = options.lblW || 100 - 10;
      lbl2 = game.render.componentRaw('component_scrolling_text', {
        text: options.text,
        w: w
      });
      var pane = new UIContainer();
      pane.addChild(lbl2);
      return pane;
    },
    "parent": 'component_composites',
    "name": 'NPC Chatter Talk'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_intro = {
    "parent": 'component_developer_guides',
    "name": 'Introduction'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_makemod = {
    "parent": 'component_developer_guides',
    "name": 'Making a mod'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_events = {
    "parent": 'component_developer_guides',
    "name": 'Events'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_colors = {
    "parent": 'component_developer_guides',
    "name": 'Themes & Colors'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_blueprints = {
    "parent": 'component_developer_guides',
    "name": 'Blueprints'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_objectindex = {
    "parent": 'component_developer_guides',
    "name": 'Object Index'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_sprites = {
    "parent": 'component_developer_guides',
    "name": 'Sprites'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_tweens = {
    "parent": 'component_developer_guides',
    "name": 'Moving & Tweens'
  };
  _BLUEPRINTS.COMPONENTS.text_devgd_inputs = {
    "parent": 'component_developer_guides',
    "name": 'Text & Input'
  };
})();