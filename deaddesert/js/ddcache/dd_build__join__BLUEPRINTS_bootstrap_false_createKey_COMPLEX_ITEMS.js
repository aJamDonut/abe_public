(function () {
  _BLUEPRINTS.COMPLEX_ITEMS = {};
  _BLUEPRINTS.COMPLEX_ITEMS.ss_oilbarrel = {
    "sprite": 'wi_oil_barrel',
    "description": 'An explosive oil barrel',
    "blockWidth": 2,
    "blockHeight": 4,
    "data": {
      "collisionGroups": 'explodeOnTouch',
      "physicsType": 'move',
      "weight": 5
    },
    "parent": 'build_world_items',
    "name": 'Oil Barrel'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_clonepodfull = {
    "sprite": 'w_emptyclonepod',
    "description": 'A clone pod',
    "blockWidth": 2,
    "blockHeight": 4,
    "meta": {
      "blockZone": 'bottom',
      "physicsType": 'static'
    },
    "events": {
      "onCreateJSON": '[{"x":4.569851921104032,"y":4.437991693417871,"type":"spine","layer":"self","scale":1,"sprite":"clonepod","anchor":0,"alpha":1,"tween":"none"},{"x":-12.164391484925602,"y":59.164391484925716,"type":"sprite","layer":"self","scale":1,"sprite":"lightgreen_screen","anchor":0,"alpha":1,"tween":"none"},{"x":143.69590467286628,"y":185.35347061256903,"type":"sprite","layer":"self","scale":0.9989368327901276,"sprite":"lightbluesheencolumn","anchor":0.5,"alpha":0.7,"tween":"none"}]'
    },
    "destroyBase": true,
    "parent": 'build_world_items',
    "name": 'Clone Pod Full'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_supercomputerreal = {
    "sprite": 'ss_supercomputer',
    "meta": {
      "blockZone": 'top'
    },
    "events": {
      "onCreateJSON": '[{"x":-14,"y":38,"type":"sprite","layer":"self","scale":1,"sprite":"lightgreen_screen","anchor":0,"alpha":1,"tween":"none"},{"x":74,"y":8,"type":"sprite","layer":"self","scale":1,"sprite":"lightgreen_screen","anchor":0,"alpha":1,"tween":"none"},{"x":158,"y":38,"type":"sprite","layer":"self","scale":1,"sprite":"lightgreen_screen","anchor":0,"alpha":1,"tween":"none"},{"x":145,"y":190,"type":"sprite","layer":"lights","scale":2,"sprite":"lightcookie_oval","anchor":0.5,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Super Computer'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_clonepodblob = {
    "sprite": 'w_emptyclonepod',
    "description": 'A clone pod',
    "blockWidth": 2,
    "blockHeight": 4,
    "data": {
      "physicsType": 'solid'
    },
    "events": {
      "onCreateJSON": '[{"x":-3.430148078895968,"y":-56.56200830658213,"layer":"self","customFilter":"none","anim":"play2","scale":1,"sprite":"clonepod","type":"spine","anchor":0,"alpha":1,"tween":"none"},{"x":-30.164391484925602,"y":-7.835608515074284,"layer":"self","customFilter":"none","scale":1,"sprite":"lightgreen_screen","type":"sprite","anchor":0,"alpha":1,"tween":"none"},{"x":124.69590467286628,"y":65.35347061256903,"layer":"self","customFilter":"none","scale":0.9989368327901276,"sprite":"lightbluesheencolumn","type":"sprite","anchor":0.5,"alpha":0.5,"tween":"none"},{"x":139.2521055035245,"y":65.86029615779194,"layer":"lights","customFilter":"none","scale":1,"sprite":"lightbluesheencolumn_black","type":"sprite","anchor":0.5,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": true,
    "parent": 'build_world_items',
    "name": 'Clone Pod Blob'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_clonepodbaby = {
    "sprite": 'w_emptyclonepod',
    "events": {
      "onCreateJSON": '[{"x":-6.430148078895854,"y":-2.562008306582129,"type":"spine","layer":"self","filter":"none","scale":1,"sprite":"clonepod","anchor":0,"alpha":1,"tween":"none"},{"x":-26.164391484925545,"y":54.16439148492577,"type":"sprite","layer":"self","filter":"none","scale":1,"sprite":"lightgreen_screen","anchor":0,"alpha":1,"tween":"none"},{"x":125.69590467286616,"y":145.35347061256903,"type":"sprite","layer":"self","filter":"bloom","scale":1,"sprite":"lightbluesheencolumn","anchor":0.5,"alpha":0.5,"tween":"breathe"},{"x":71,"y":4,"type":"sprite","layer":"lights","filter":"none","scale":0.5,"sprite":"lightbluesheencolumn_black","anchor":0,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": true,
    "parent": 'build_world_items',
    "name": 'Clone Pod Baby'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_labclonebed = {
    "sprite": 'w_labclonebed',
    "events": {
      "onCreate": function () {}
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Lab Clone Bed'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_labserver2 = {
    "sprite": 'w_server2',
    "meta": {
      "blockZone": 'top'
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Server 2'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.item_white_camera = {
    "sprite": 'camera_white',
    "description": 'A white camera',
    "blockWidth": 1,
    "blockHeight": 1,
    "data": {
      "physicsType": 'solid',
      "weight": 3
    },
    "parent": 'build_world_items',
    "name": 'White Camera'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container3 = {
    "sprite": 'container_2',
    "events": {
      "onCreate": function (furni, loadData) {
        game.inventories.createInventoryForItem(furni, 15, 15);
      }
    },
    "parent": 'build_world_items',
    "name": 'Saveable Container'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.zone_tp = {
    "sprite": 'save_icon',
    "blockWidth": 1,
    "blockHeight": 1,
    "data": {
      "collisionGroups": 'tp',
      "physicsType": 'sensor',
      "weight": 1
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Zone_TP'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_emitter = {
    "sprite": 'container_2',
    "description": 'An item container',
    "blockWidth": 4,
    "blockHeight": 3,
    "meta": {
      "blockZone": 'all',
      "physicsType": 'sensor',
      "contextOptions": 'loot,hack,pickup'
    },
    "events": {
      "onCreate": function (furni) {
        var particle = new Particles('sparks_1');
        particle.furni = furni;
        particle.x = furni.x;
        particle.y = furni.y;
        game.render.aboveLife.addChild(particle);
        try {
          particle.playOnce();
        } catch (e) {}
      }
    },
    "destroyBase": true,
    "parent": 'build_world_items',
    "name": 'Emitter'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.helper_guard_point = {
    "sprite": 'btn_blank_sqr',
    "meta": {
      "physicsType": 'logic'
    },
    "events": {
      "onCreate": function (spawner) {
        game.offloader.addToIndex('helper_guard_point', spawner);
      }
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Guard point'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_sign_weapons = {
    "sprite": 'sprite_sign_road',
    "events": {
      "onCreateJSON": '[{"x":32,"y":-1,"type":"sprite","layer":"self","filter":"black","scale":1,"sprite":"weapon_handgun","anchor":0,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Weapons Sign'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_sign_trade = {
    "sprite": 'sprite_sign_road',
    "events": {
      "onCreateJSON": '[{"x":64,"y":31,"type":"sprite","layer":"self","filter":"black","scale":1,"sprite":"item_cogs","anchor":0,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Trade Sign'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_sign_armour = {
    "sprite": 'sprite_sign_road',
    "events": {
      "onCreateJSON": '[{"x":40,"y":11,"type":"sprite","layer":"self","filter":"black","scale":0.8,"sprite":"mask_thejester","anchor":0,"alpha":1,"tween":"none"}]'
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Trade Armour'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.helper_shopper = {
    "sprite": 'btn_blank_sqr2',
    "meta": {
      "physicsType": 'logic'
    },
    "events": {
      "onCreate": function (spawner) {
        game.offloader.addToIndex('helper_shopper_point', spawner);
        game.offloader.addToIndex('helper_guard_point', spawner);
      }
    },
    "destroyBase": false,
    "parent": 'build_world_items',
    "name": 'Shopper point'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_campfire = {
    "sprite": 'sprite_campfire',
    "meta": {
      "weight": 1,
      "contextOptions": ' ',
      "description": 'Campfire'
    },
    "events": {
      "onCreate": function (options) {
        if (this.data.isPlayer) {
          game.session.tutComplete('crafted_campfire');
        }
        var fire = game.render.createAnimatedSprite('anisprite_fire2');
        fire.x = 5;
        fire.y = 0;
        fire.alpha = 0.75;
        fire.scale.x = 0.8;
        fire.scale.y = 0.8;
        fire.animationSpeed = 0.1;
        this.addChild(fire);
        var particle = new Particles('fire_1');
        particle.x = 32;
        particle.y = 32;
        this.addChildAt(particle, 0);
        particle.playForever();
        var particle = new Particles('smoke_3');
        particle.x = 32;
        particle.y = 20;
        this.addChildAt(particle, 0);
        particle.playForever();
        var myLight = new Sprite('lightcookie_oval', {
          anchor: 'center'
        });
        myLight.x = this.x + this.width / 2 - 5;
        myLight.y = this.y + this.height / 2;
        game.tween(myLight, 'breathe');
        game.render.lights.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Campfire'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_gun = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_gun', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_gun', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Gun'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_shop = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_shop', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_shop', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Shop'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_recycle = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_recycle', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_recycle', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Recycle'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_shield = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_shield', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_shield', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Shield'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_lab = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_lab', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_lab', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Lab'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_holo_sheriff = {
    "sprite": 'sprite_holo_disc',
    "meta": {
      "weight": 1,
      "contextOptions": ' '
    },
    "events": {
      "onCreate": function (options) {
        let myLight = new Sprite('sprite_holo_sheriff', {
          anchor: 'center'
        });
        myLight.scale.set(0.5);
        myLight.x += this.width / 2;
        myLight.x += 4;
        myLight.y += 20;
        game.l = myLight;
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
        myLight = new Sprite('sprite_holo_sheriff', {
          anchor: 'center'
        });
        myLight.scale.set(0.75);
        myLight.x += this.width / 2;
        myLight.x += 10;
        myLight.y += 35;
        myLight.alpha = 0.35;
        game.l = myLight;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'levitate', {
          range: myLight.height / 4
        });
        this.addChild(myLight);
      }
    },
    "parent": 'build_world_items',
    "name": 'Holo Light Sheriff'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_labserver1 = {
    "sprite": 'w_server1',
    "description": 'A clone pod',
    "blockWidth": 2,
    "blockHeight": 4,
    "data": {
      "physicsType": 'solid'
    },
    "destroyBase": false,
    "parent": 'build_lab_items',
    "name": 'Server 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_lab_radsuit1 = {
    "sprite": 'lab_suit_1',
    "description": 'A radiation suit',
    "blockWidth": 1,
    "blockHeight": 1,
    "data": {
      "physicsType": 'solid'
    },
    "destroyBase": false,
    "parent": 'build_lab_items',
    "name": 'Radiation Suit 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_lab_radsuit2 = {
    "sprite": 'lab_suit_2',
    "description": 'A radiation suit',
    "blockWidth": 1,
    "blockHeight": 1,
    "data": {
      "physicsType": 'solid'
    },
    "destroyBase": false,
    "parent": 'build_lab_items',
    "name": 'Radiation Suit 2'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.worlditem_craftingbench = {
    "sprite": 'sprite_craftbench2',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        game.inventories.createInventoryForItem(item, 10, 10, true);
        if (this.data.queue) {
          this.data.queue = new CraftQueue(this, item.data.queue.data);
        } else {
          this.data.queue = new CraftQueue(this);
        }
        this.contextMenus['Craft'] = function (caller) {
          let craft = game.render.component('hud_bench_crafting', {
            crafter: caller
          }, 'hud_bench_crafting');
          craft.x = 400;
          craft.y = 200;
          game.render.aboveAll.addChild(craft);
        };
        item.data.job = 'haul';
        item.sync();
        game.offloader.addToIndex('jobs', item);
        game.offloader.addToIndex('ticker', item);
        game.offloader.addToIndex('playerstorage', item);
      },
      "onWorldTick": function () {}
    },
    "destroyBase": false,
    "parent": 'build_persistent_items',
    "name": 'Crafting Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_researchbench = {
    "sprite": 'sprite_craftbench2',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        this.addExtension('ext_craftingbench', {
          bench: 'researchbench'
        });
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_items',
    "name": 'Research Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_buildwall = {
    "sprite": 'icon_build_spot',
    "events": {
      "onCreate": function (item) {
        game.grid.updateTile(game.gridPos(item.x), game.gridPos(item.y), item.data.across || 4, item.data.down || 4, game.drawLayer);
        game.grid.drawWalls();
        item.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_items',
    "name": 'Build Wall Job'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.sensor_npc_big = {
    "sprite": 'btn_blank_sqr2',
    "meta": {
      "collisionGroups": 'collision_get_touchers',
      "physicsType": 'sensor'
    },
    "events": {
      "onCreate": function () {},
      "onPhysicsTick": function () {
        let life = servers.physics.index.getFromIndex(this.data.parentId, 'all');
        if (!life) {
          this.helper.debug("Can't find: " + this.data.parentId);
          return false;
        }
        this.lastX = 0;
        this.lastY = 0;
        servers.physics.Body.setPosition(this.body, life.body.position);
      },
      "onPreCreate": function () {
        this.data.radius = 1000;
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_items',
    "name": 'Big NPC Sensor'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_projectile_simple = {
    "events": {
      "onPhysicsTick": function () {
        this.dieOnWallCheck();
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Projectile Simple'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_haul_helper = {
    "sprite": 'icon_recipe_spot',
    "events": {
      "onCreate": function (item) {
        item.data.job = 'haul';
        item.sync();
        game.index.addToIndex('jobgiver', item);
        game.offloader.addToIndex('jobs', item);
        item.alpha = 1;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.phase = 0;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          let parent = game.index.getFromIndex(this.data.parentId, 'all');
          let source = game.index.getFromIndex(this.data.sourceId, 'all');
          let resource = this.data.resource;
          let qty = this.data.qty;
          let resources = source.inventory.getResources();
          let localQty = resources['ss_item_' + resource];
          if (!localQty || localQty < 1) {
            this.failed("Quantity changed, no problems.. expected exception");
            caller.completeJob(this);
            return;
          }
          if (this.steps === 3 && this.phase === 0) {
            this.x = parent.x;
            this.y = parent.y;
            this.phase = 1;
            this.steps = 0;
            this.data.job = "dropoff";
            this.sync();
            caller.forceAnim = false;
            let takeMax = localQty >= qty ? qty : localQty;
            if (takeMax > 10) {
              takeMax = 10;
            }
            if (caller.inventory.main.addResource(resource, takeMax)) {
              source.inventory.removeResource(resource, takeMax);
            } else {
              caller.completeJob(this);
            }
            return;
          }
          if (this.steps === 3 && this.phase === 1) {
            this.phase = 2;
            this.steps = 0;
            let callerResources = caller.inventory.main.getResources();
            if (!callerResources['ss_item_' + resource]) {
              caller.completeJob(this);
              return;
            }
            let giveMax = qty < callerResources['ss_item_' + resource] ? qty : callerResources['ss_item_' + resource];
            if (parent.inventory.addResource(resource, giveMax)) {
              caller.inventory.main.removeResource(resource, giveMax);
            }
            this.sync();
            caller.forceAnim = false;
            caller.completeJob(this);
            this.alpha = 0;
          }
        };
      },
      "onJobCheck": function (item, life) {
        let parent = this.helper.world.index.getFromIndex(this.data.parentId, 'all');
        let resource = item.data.resource;
        let qty = item.data.qty;
        let lifeQty = life.itemList['ss_item_' + resource];
        if (lifeQty && lifeQty > 0) {
          return false;
        }
        return true;
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Helper - Get recipe'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_dropoff_helper = {
    "sprite": 'icon_haul_spot',
    "meta": {
      "physicsType": 'logic'
    },
    "events": {
      "onCreate": function (item) {
        item.data.job = 'haul';
        item.sync();
        game.index.addToIndex('jobgiver', item);
        game.offloader.addToIndex('jobs', item);
        item.alpha = 1;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          let parent = game.index.getFromIndex(this.data.parentId, 'all');
          let resource = this.data.resource;
          let qty = this.data.qty;
          if (this.steps >= this.maxSteps) {
            let callerResources = caller.inventory.main.getResources();
            if (!callerResources['ss_item_' + resource]) {
              caller.completeJob(this);
              return;
            }
            let giveMax = qty <= callerResources['ss_item_' + resource] ? qty : callerResources['ss_item_' + resource];
            if (parent.inventory.addResource(resource, giveMax)) {
              if (!caller.inventory.main.removeResource(resource, giveMax)) {
                parent.inventory.removeResource(resource, giveMax);
              }
            } else {}
            this.sync();
            caller.forceAnim = false;
            caller.completeJob(this);
            this.alpha = 0;
          }
        };
      },
      "onJobCheck": function (item, life) {
        let resource = item.data.resource;
        let qty = item.data.qty;
        let lifeQty = life.itemList['ss_item_' + resource];
        if (lifeQty && lifeQty > 0) {
          return true;
        }
        return false;
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Helper - Drop Off'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_craft_helper = {
    "sprite": 'icon_craft_spot',
    "events": {
      "onCreate": function (item) {
        item.data.job = 'haul';
        item.sync();
        game.index.addToIndex('jobgiver', item);
        game.offloader.addToIndex('jobs', item);
        item.alpha = 1;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          let parent = game.index.getFromIndex(this.data.parentId, 'all');
          if (!parent) {
            game.trickle.add(() => {
              parent.destroy();
            });
            return;
          }
          let craftItem = this.data.craftItem;
          if (this.steps === this.maxSteps) {
            let recipe = game.session.getRecipe(craftItem.recipe);
            let craftCodename = recipe.crafts;
            let craftedItem = new InventoryItem(craftCodename);
            if (parent.inventory.hasRecipe(craftItem.recipe) && parent.inventory.addItemNow(craftedItem)) {
              caller.xpAction('crafteditem', craftedItem);
              parent.inventory.removeRecipe(craftItem.recipe);
              parent.queue.completeItemAt(0);
            } else {}
            this.sync();
            caller.forceAnim = false;
            caller.completeJob(this);
            this.alpha = 0;
          }
        };
      },
      "onJobCheck": function (item, life) {
        return true;
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Helper - Craft item'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_player_storage = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        game.inventories.createInventoryForItem(item, 10, 10, false, function (item) {
          this.sync();
        });
        item.data.job = 'store';
        item.sync();
        game.offloader.addToIndex('jobs', item);
        game.offloader.addToIndex('playerstorage', item);
        game.index.addToIndex('playerstorage', item);
        game.offloader.addToIndex('ticker', item);
        item.alpha = 1;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          if (this.steps === this.maxSteps) {
            this.steps = 0;
            caller.inventory.main.transferItems(this.inventory);
            this.sync();
            caller.forceAnim = false;
            caller.completeJob(this, true);
            if (caller.data.gatherId) {
              game.session.setCommand(caller, 'move');
              caller.data.do = 'gather';
              caller.sync();
            }
          }
        };
      },
      "onJobCheck": function (item, life) {
        return life.data.inventoryFull;
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Player Storage'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_projectile_melee = {
    "events": {
      "onPhysicsTick": function () {
        this.dieOnWallCheck();
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Projectile Melee'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_chop_helper = {
    "sprite": 'icon_gather_spot',
    "meta": {
      "physicsType": 'logic'
    },
    "events": {
      "onCreate": function (item) {
        item.data.job = 'chop';
        item.sync();
        game.index.addToIndex('jobgiver', item);
        game.offloader.addToIndex('jobs', item);
        item.alpha = 1;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 1;
        item.jobStep = function (data) {
          let caller = game.index.getFromIndex(data.callerId, 'all');
          if (!caller) return item.failed("Cant find assigned life");
          caller.data.do = 'gather';
          caller.data.gatherId = this.data.parentId;
          caller.sync();
        };
      },
      "onJobCheck": function (item, life) {
        return !life.isFull();
      }
    },
    "parent": 'build_persistent_items',
    "name": 'Helper - Chop Tree'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        var player = new LifeObject();
        bodies = ['body_smoker', 'body_camo', 'body_medical'];
        player.x = spawner.x;
        player.y = spawner.y;
        player.setAnim('none/idle_down', true);
        player.data.static = true;
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Custom'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_blackdiamond = {
    "sprite": 'sprite_blackdiamond_1',
    "events": {
      "onCreate": function (spawner) {
        const shadowSprite = new ComplexItem(spawner.codename);
        shadowSprite.filters = [new PIXI.filters.BlurFilter(8), new PIXI.filters.ColorOverlayFilter(0x000000, 0.5)];
        spawner.shadow = shadowSprite;
        shadowSprite.alpha = 0.25;
        shadowSprite.scale(-0.5);
        shadowSprite.pivot.set(0.5, 1);
        shadowSprite.skew.set(-0.5, 0);
        shadowSprite.position.set(spawner.x + 64, spawner.y + 16);
        game.render.background.addChild(shadowSprite);
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Custom'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.complex_windmill = {
    "sprite": 'sprite_big_pole',
    "events": {
      "onCreate": function (spawner) {
        let mill = new Sprite('sprite_tri_mill');
        spawner.mill = mill;
        mill.scale.set(-0.5);
        spawner.addChild(mill);
        mill.x = mill.width / 4 - 31;
        mill.y = 30;
        mill.anchor.set(0.495, 0.375);
        game.tween(mill, 'spinForever');
        const shadowSprite = new ComplexItem('complex_windmill_shadow');
        shadowSprite.interactive = false;
        shadowSprite.position.set(spawner.x + 128 + 118, spawner.y + 32);
        shadowSprite.onCreate();
        shadowSprite.filters = [new PIXI.filters.BlurFilter(8), new PIXI.filters.ColorOverlayFilter(0x000000, 0.5)];
        spawner.shadow = shadowSprite;
        shadowSprite.alpha = 0.25;
        shadowSprite.scale(-0.5);
        shadowSprite.pivot.set(0.5, 1);
        shadowSprite.skew.set(-0.5, 0);
        game.render.background.addChild(shadowSprite);
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Windmill'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.complex_windmill_shadow = {
    "sprite": 'sprite_big_pole',
    "events": {
      "onCreate": function (spawner) {
        let mill = new Sprite('sprite_tri_mill');
        spawner.mill = mill;
        mill.scale.set(-0.5);
        spawner.addChild(mill);
        mill.x = mill.width / 4 - 31;
        mill.y = 30;
        mill.anchor.set(0.495, 0.375);
        game.tween(mill, 'spinForever');
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Windmill'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.complex_windmill_BKUP = {
    "sprite": 'sprite_big_pole',
    "events": {
      "onCreate": function (spawner) {
        let mill = new Sprite('sprite_tri_mill');
        spawner.mill = mill;
        mill.scale.set(-0.5);
        spawner.addChild(mill);
        mill.x = mill.width / 4 - 31;
        mill.y = 30;
        mill.anchor.set(0.495, 0.375);
        game.tween(mill, 'spinForever');
        const shadowSprite = new ComplexItem('complex_windmill_shadow');
        shadowSprite.interactive = false;
        shadowSprite.position.set(spawner.x + 128 + 118, spawner.y + 32);
        shadowSprite.onCreate();
        shadowSprite.filters = [new PIXI.filters.BlurFilter(8), new PIXI.filters.ColorOverlayFilter(0x000000, 0.5)];
        spawner.shadow = shadowSprite;
        shadowSprite.alpha = 0.25;
        shadowSprite.scale(-0.5);
        shadowSprite.pivot.set(0.5, 1);
        shadowSprite.skew.set(-0.5, 0);
        game.render.background.addChild(shadowSprite);
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Windmill'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_sin = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(8);
        player.data.faction = 'sincorp';
        player.data.levels.toughness.level = game.rng(50, 75);
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem('ss_sin_armor'), true);
          player.inventory.backWeapon.addItem(new InventoryItem('ss_weapon_shotty1'), true);
          if (game.rng(0, 1) == 1) {
            player.inventory.weapon.addItem(new InventoryItem('ss_weapon_plank'), true);
          } else {
            player.inventory.weapon.addItem(new InventoryItem('ss_weapon_black_katana'), true);
          }
          if (game.rng(0, 2) != 1) {
            let masks = ['ss_mask_gasmask', 'ss_mask_staff'];
            player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
          }
        } catch (e) {}
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Sin Guard'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_deadhead = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setAnim('none/idle_down', true);
        player.data.static = true;
        player.data.faction = 'deadhead';
        player.data.name = "Deadhead";
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.setBlank();
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead'), true);
          player.inventory.body.addItem(new InventoryItem('ss_body_gray'), true);
          player.inventory.mask.addItem(new InventoryItem('ss_mask_deadhead'), true);
        } catch (e) {}
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Deadhead'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_uglybug = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectAnim();
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.faction = 'wild';
        game.render.lifeLayer.addChild(player);
        player.setSpecies('animal');
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.main.addResource('rawmeat', game.rng(1, 2));
        player.inventory.main.addResource('skin', game.rng(1, 3));
        player.inventory.main.addResource('spidereye', 1);
        player.inventory.body.addItem(new InventoryItem('ss_animal_blue_uglybug', {
          disabled: true
        }), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Ugly Bug'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_skincrawler = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.body.addItem(new InventoryItem('ss_animal_skincrawler'), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead'), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Skin Crawler'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_sucker = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'civilian';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.body.addItem(new InventoryItem('ss_animal_sucker'), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead'), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Sucker'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_tick = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectSimple();
        player.setBlank();
        player.randomizeStats(1);
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.faction = 'passive wild';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.main.addResource('rawmeat', game.rng(1, 2));
        player.inventory.main.addResource('skin', '1');
        player.inventory.body.addItem(new InventoryItem('ss_animal_tick', {
          disabled: true
        }), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Tick'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_shopkeeper = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setAnim('none/idle_down', true);
        player.data.static = true;
        player.data.faction = 'sincorp';
        game.render.lifeLayer.addChild(player);
        player.data.levels.toughness.level = game.rng(50, 75);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.setAnim('none/idle_down', true);
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
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Shop Keeper'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_template = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(8);
        player.data.faction = 'sincorp';
        player.data.levels.toughness.level = game.rng(50, 75);
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem('ss_sin_armor'), true);
          player.inventory.weapon.addItem(new InventoryItem('ss_weapon_shotty1'), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Simple Spawn template'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_civ1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'civilian';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = [];
          bodies = ['ss_rags', 'ss_clone_shirt', 'ss_clone_shirt2', 'ss_clone_jacket2', 'ss_clone_jacket'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.backWeapon.addItem(new InventoryItem('ss_weapon_pickaxe'), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Civ 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_bandit1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'bandit';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = ['ss_mask_bandit_hatmask', 'ss_mask_ranchet', 'ss_mask_bandana', 'ss_mask_plainmask'];
          bodies = ['ss_body_smoker', 'ss_body_camo'];
          weapons = ['ss_weapon_handgun', 'ss_weapon_katana'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
          player.inventory.weapon.addItemNow(new InventoryItem(weapons[game.rng(0, weapons.length - 1)]), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Bandit 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_doctor1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'civilian';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = ['ss_mask_docoscope'];
          bodies = ['ss_body_medical', 'ss_clone_jacket2'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Doctor 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_hunter1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'hunter';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = ['ss_mask_junkdroid', 'ss_mask_deathspawneye'];
          bodies = ['ss_body_tunic_1', 'ss_body_tunic_2'];
          weapons = ['ss_weapon_crossbow', 'ss_weapon_hatchet_st'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
          player.inventory.weapon.addItemNow(new InventoryItem(weapons[game.rng(0, weapons.length - 1)]), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Hunter 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_humanoid_yamakai1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'yamakai';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = ['ss_mask_farmerhat'];
          bodies = ['ss_rags', 'ss_rags2'];
          weapons = ['ss_weapon_katana'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          if (game.rng(0, 2) == 1) {
            player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
          }
          player.inventory.weapon.addItemNow(new InventoryItem(weapons[game.rng(0, weapons.length - 1)]), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Yamakai 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_recruitable_civ = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'civilian';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = [];
          bodies = ['ss_rags', 'ss_clone_shirt', 'ss_clone_shirt2', 'ss_clone_jacket2', 'ss_clone_jacket'];
          player.data.dialog = 'dialog_recruit_npc';
          player.randomName();
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.backWeapon.addItem(new InventoryItem('ss_weapon_pickaxe'), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Civ Recruitable'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_robo_civ1 = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'civilian';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        try {
          masks = ['ss_item_mask_spherehead'];
          bodies = ['ss_item_body_robot_slim'];
          player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
          player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
          player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Robo Civ 1'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_docobot = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObject();
        player.data.spawnX = spawner.x;
        player.data.spawnY = spawner.y;
        player.x = spawner.x;
        player.y = spawner.y;
        player.setBlank();
        player.randomizeStats(1);
        player.data.faction = 'sincorp';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.data.species = "humanoidbot";
        try {
          player.data.name = "Docobot";
          player.data.dialog = 'dialog_docobot_start';
          player.data.stats.hp = 10;
          let wep = new InventoryItem('ss_weapon_sin_baton_weak', {
            disabled: true
          });
          player.inventory.weapon.addItem(wep, true);
          let body = new InventoryItem('ss_item_body_robot_slim', {
            disabled: true
          });
          player.inventory.body.addItem(body, true);
          let mask = new InventoryItem('ss_item_mask_spherehead', {
            disabled: true
          });
          player.inventory.mask.addItem(mask, true);
          let brain = new InventoryItem('ss_brain_solver', {
            disabled: true
          });
          player.inventory.brain.addItem(brain, true);
          player.inventory.main.addItem(new InventoryItem('ss_item_key_cr1'), true);
          player.inventory.main.addItem(new InventoryItem('codec_resources'), true);
        } catch (e) {}
        player.sync();
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'DocoBot'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_petibulb_tree = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectStatic();
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.faction = 'wild';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.main.addResource('rawmeat', game.rng(1, 2));
        player.inventory.main.addResource('skin', game.rng(1, 3));
        player.inventory.main.addResource('spidereye', 1);
        player.inventory.body.addItem(new InventoryItem('ss_animal_petibulb_tree', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Petibulb Tree Spawn'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_petibulb_mini = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectSimple();
        player.x = spawner.x;
        player.y = spawner.y;
        player.setOwner(spawner);
        player.data.faction = 'wild';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.body.addItem(new InventoryItem('ss_animal_petibulb_' + game.rng(1, 2), {
          disabled: true
        }), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Petibulb Mini Spawn'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_mantis_red = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        try {
          var player = new LifeObjectAnim();
          player.x = spawner.x;
          player.y = spawner.y;
          player.setOwner(spawner);
          player.data.faction = 'wild';
          game.render.lifeLayer.addChild(player);
          game.world.addObject(player);
          game.world.addToServer(player);
          player.inventory.body.addItem(new InventoryItem('ss_animal_red_mantis', {
            disabled: true
          }), true);
          player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
            disabled: true
          }), true);
          game.lastp = player;
          spawner.destroy();
        } catch (e) {}
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Red Mantis Spawn'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_mechaspyder = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectAnim();
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.faction = 'wild';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.main.addResource('rawmeat', game.rng(1, 2));
        player.inventory.main.addResource('skin', game.rng(1, 3));
        player.inventory.main.addResource('spidereye', 1);
        player.inventory.body.addItem(new InventoryItem('ss_animal_mechaspyder', {
          disabled: true
        }), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Mecha Spyder'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_yeuxball = {
    "sprite": 'body_yeuxball',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectSimple();
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.ko = true;
        player.data.physIsSensor = false;
        player.data.physDensity = 10;
        player.data.physRestitution = 0;
        player.data.physAvoid = false;
        player.data.physIsMoveable = true;
        player.data.worldNoLOS = true;
        player.data.dir = "up";
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.body.addItem(new InventoryItem('ss_animal_yeuxball'), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Yeux Ball'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_landskwid = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.editMode) {
          return;
        }
        var player = new LifeObjectAnim();
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.faction = 'wild';
        game.render.lifeLayer.addChild(player);
        game.world.addObject(player);
        game.world.addToServer(player);
        player.inventory.main.addResource('rawmeat', game.rng(1, 2));
        player.inventory.main.addResource('skin', game.rng(1, 3));
        player.inventory.main.addResource('spidereye', 1);
        player.inventory.body.addItem(new InventoryItem('ss_animal_landskwid', {
          disabled: true
        }), true);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_deadhead', {
          disabled: true
        }), true);
        game.lastp = player;
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Land Skwid'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_player = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.urlVar('slot')) {
          game.slot = game.urlVar('slot');
        }
        if (game.editMode) {
          return;
        }
        try {
          game.index.getIndex('open_components')['frontMenu'].destroy();
        } catch (e) {}
        player = new LifeObject(false, {
          isPlayer: true
        });
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.static = true;
        player.randomName();
        player.data.name = spawner.data.name || player.data.name;
        player.data.ownedAge = 1;
        player.data.faction = 'nomad';
        game.render.lifeLayer.addChild(player);
        game.world.addToServer(player);
        game.world.addObject(player);
        game.p = player;
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_player_mk1'), true);
          switch (game.startType) {
            case "robot":
              player.setSpecies("robot");
              masks = ['ss_item_mask_spherehead'];
              bodies = ['ss_item_body_robot_slim'];
              player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
              player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
              player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
              break;
            case "human":
              player.setSpecies("human");
              break;
            case "clone":
            default:
              player.setSpecies("clone");
              player.addStatusFromClient('clone_needs', {
                duration: Infinity,
                source: 'gamestart'
              });
          }
        } catch (e) {}
        game.world.setPlayerId(game.p);
        game.render.viewport.toward(game.p.x, game.p.y);
        game.render.lifeLayer.addChild(player);
        player.addStatus('naturalhealing');
        game.session.addPlayerPawn(player);
        game.session.unlockRecipeRaw('planning');
        game.session.unlockRecipe('pers_worlditem_campfire');
        game.session.unlockRecipe('pers_worlditem_materialbench');
        game.session.unlockRecipe('ss_weapon_crossbow');
        game.session.unlockRecipe('building_material');
        game.session.unlockRecipe('redbar');
        game.session.unlockRecipe('cookedmeat');
        spawner.destroy();
        if (game.testMode && typeof game.testReady == 'function') {
          game.testReady();
        }
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Player'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_item_lilglows = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {}
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Lil Glows'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_newgame = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.urlVar('slot')) {
          game.slot = game.urlVar('slot');
        }
        if (game.editMode) {
          return;
        }
        if (game.session.countPawns() > 0) {
          spawner.destroy();
          return;
        }
        try {
          game.index.getIndex('open_components')['frontMenu'].destroy();
        } catch (e) {}
        player = new LifeObject(false, {
          isPlayer: true
        });
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.static = true;
        player.randomName();
        player.data.name = spawner.data.name || player.data.name;
        player.data.ownedAge = 1;
        player.data.faction = 'nomad';
        game.p = player;
        let setupPlayer = () => {};
        try {
          player.inventory.brain.addItem(new InventoryItem('ss_brain_player_mk1'), true);
          switch (game.startType) {
            case "robot":
              player.setSpecies("robot");
              setupPlayer = () => {
                masks = ['ss_item_mask_spherehead'];
                bodies = ['ss_item_body_robot_slim'];
                player.inventory.brain.addItem(new InventoryItem('ss_brain_clone_mk1'), true);
                player.inventory.body.addItem(new InventoryItem(bodies[game.rng(0, bodies.length - 1)]), true);
                player.inventory.mask.addItem(new InventoryItem(masks[game.rng(0, masks.length - 1)]), true);
              };
              break;
            case "human":
              player.setSpecies("human");
              setupPlayer = () => {};
              break;
            case "clone":
            default:
              player.setSpecies("clone");
              setupPlayer = () => {
                player.addStatusFromClient('clone_needs', {
                  duration: Infinity,
                  source: 'gamestart'
                });
              };
          }
        } catch (e) {}
        game.render.lifeLayer.addChild(player);
        game.world.addToServer(player);
        game.world.addObject(player);
        setupPlayer();
        game.world.setPlayerId(game.p);
        game.render.viewport.toward(game.p.x, game.p.y);
        game.render.lifeLayer.addChild(player);
        player.addStatus('naturalhealing');
        game.session.addPlayerPawn(player);
        game.session.unlockRecipeRaw('planning');
        game.session.unlockRecipe('pers_worlditem_campfire');
        game.session.unlockRecipe('cooked_meat');
        game.session.unlockRecipe('redbar');
        game.session.unlockRecipe('ss_weapon_club_w');
        game.session.unlockRecipe('ss_weapon_shinai');
        game.session.unlockRecipe('pers_worlditem_materialbench');
        game.session.unlockRecipe('pers_worlditem_craftingbench');
        game.session.unlockRecipe('building_material');
        game.session.unlockRecipe('pers_worlditem_smelter');
        game.session.unlockRecipe('metalingot');
        game.session.unlockRecipe('ss_item_bandage_small');
        game.session.unlockRecipe('ss_item_weakrope');
        game.session.unlockRecipe('ss_backpack_satchel');
        game.session.unlockRecipe('ss_weapon_crossbow');
        game.session.unlockRecipe('ss_item_bedroll');
        game.session.unlockRecipe('ss_util_bedroll');
        spawner.destroy();
        if (game.testMode && typeof game.testReady == 'function') {
          game.testReady();
        }
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'New Game Spawn'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.spawn_evotix = {
    "sprite": 'btn_blank_sqr',
    "events": {
      "onCreate": function (spawner) {
        if (game.urlVar('slot')) {
          game.slot = game.urlVar('slot');
        }
        if (game.editMode) {
          return;
        }
        try {
          game.index.getIndex('open_components')['frontMenu'].destroy();
        } catch (e) {}
        player = new LifeObject(false, {
          isPlayer: true
        });
        player.x = spawner.x;
        player.y = spawner.y;
        player.data.static = true;
        player.randomName();
        player.data.name = spawner.data.name || player.data.name;
        player.data.ownedAge = 1;
        player.data.faction = 'nomad';
        game.render.lifeLayer.addChild(player);
        game.world.addToServer(player);
        game.world.addObject(player);
        player.inventory.brain.addItem(new InventoryItem('ss_brain_player_mk1'), true);
        player.inventory.body.addItem(new InventoryItem('ss_item_body_evotix'), true);
        game.render.viewport.toward(game.p.x, game.p.y);
        game.render.lifeLayer.addChild(player);
        game.session.addPlayerPawn(player);
        game.session.unlockRecipeRaw('planning');
        game.session.unlockRecipe('pers_worlditem_campfire');
        game.session.unlockRecipe('pers_worlditem_materialbench');
        game.session.unlockRecipe('ss_weapon_crossbow');
        game.session.unlockRecipe('building_material');
        game.session.unlockRecipe('redbar');
        game.session.unlockRecipe('cookedmeat');
        spawner.destroy();
      }
    },
    "destroyBase": false,
    "parent": 'build_world_spawners',
    "name": 'Evotix'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container2 = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        var hasSaveData = furni.data.inventory ? true : false;
        game.inventories.createInventoryForItem(furni, 10, 10);
        var myLight = new Sprite('container_2_light', {
          anchor: 'center'
        });
        myLight.x = furni.width / 2;
        myLight.y = furni.height / 2 + 15;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'breathe');
        furni.addChild(myLight);
        var myLight = new Sprite('lightcookie_oval', {
          anchor: 'center'
        });
        myLight.x = furni.x + furni.width / 2;
        myLight.y = furni.y + furni.height / 2 + 15;
        game.tween(myLight, 'breathe');
        game.render.lights.addChild(myLight);
        if (hasSaveData) {
          return false;
        }
        var item = new InventoryItem('codec_a1');
        furni.inventory.addItem(item, true);
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Codec Container'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_container = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          furni.inventory.addItem(new InventoryItem(codename), true);
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Container'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container5 = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        var hasSaveData = furni.data.inventory ? true : false;
        game.inventories.createInventoryForItem(furni, 5, 5);
        var myLight = new Sprite('container_2_light', {
          anchor: 'center'
        });
        myLight.x = furni.width / 2;
        myLight.y = furni.height / 2 + 15;
        myLight.filters = [game.render.filters.bloom];
        game.tween(myLight, 'breathe');
        furni.addChild(myLight);
        var myLight = new Sprite('lightcookie_oval', {
          anchor: 'center'
        });
        myLight.x = furni.x + furni.width / 2;
        myLight.y = furni.y + furni.height / 2 + 15;
        game.tween(myLight, 'breathe');
        game.render.lights.addChild(myLight);
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Small Wooden Container'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_bandage_container = {
    "sprite": 'sprite_med_box',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        if (game.editMode) {
          return false;
        }
        var hasSaveData = furni.data.inventory ? true : false;
        game.inventories.createInventoryForItem(furni, 7, 4);
        if (hasSaveData) {
          return;
        }
        furni.inventory.addItem(new InventoryItem('ss_item_bandage_small'), true);
        furni.inventory.addItem(new InventoryItem('ss_item_adhesive'), true);
        furni.inventory.addItem(new InventoryItem('ss_item_medical_pen'), true);
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Bandage Container'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_armour = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_armour'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Armour'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_s_armour = {
    "sprite": 'container_vault',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'hack',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_shop', {
          count: 20,
          table: ['basic_armour', 'med_armour', 'med_blueprint', 'med_junk']
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Wooden Armour shop'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerarmor = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'body') {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Armors'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerbackpack = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'backpack') {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Backpacks'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_weapons = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_weapons'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Weapons'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_masks = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_mask'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Masks'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_s_weapon = {
    "sprite": 'container_vault',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'hack',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_shop', {
          table: 'basic_weapons'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Wooden Weapon shop'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_s_junk = {
    "sprite": 'container_vault',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'hack',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_shop', {
          count: 20,
          table: 'basic_junk'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Wooden Junk shop'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_s_medical = {
    "sprite": 'container_vault',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'hack',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_shop', {
          table: 'basic_medical'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Wooden Medical shop'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_junk = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_junk'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Junk'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_blueprint = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_blueprint'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Blueprint'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_armour = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_armour'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Armour Med'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_w_medical = {
    "sprite": 'sprite_med_box',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'basic_medical'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Medical'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_weapon = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_weapon'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Weapons Med'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_mask = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_mask'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Mask Med'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_junk = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_junk'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Junk Med'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_medical = {
    "sprite": 'sprite_med_box',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_medical'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Medical Medical'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_m_blueprint = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function () {
        this.addExtension('ext_loot_w_light', {
          table: 'med_blueprint'
        });
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Blueprint Med'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_resources = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'resource') {
            let res = new InventoryItem(codename);
            furni.inventory.addResource(codename.replace('ss_item_', ''), res.maxStack);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'All Resources'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_smallstorage = {
    "sprite": 'container_5',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 4, 4, true);
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Small Storage'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerlore = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (codename.match(/codec/)) {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
          if (codename.match(/bounty/)) {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Lore (All)'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containermask = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'mask') {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Masks'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerweapon = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'weapon') {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Weapons'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerbrains = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.slots == 'brain') {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Brains'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_admin_containerbps = {
    "sprite": 'container_2',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot,hack,pickup',
      "description": 'A handy item container'
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 25, 25, true);
        for (var codename in _BLUEPRINTS.INV_ITEMS) {
          if (_BLUEPRINTS.INV_ITEMS[codename].meta.recipe) {
            furni.inventory.addItem(new InventoryItem(codename), true);
          }
        }
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Admin Blueprints'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_container_mediumstorage = {
    "sprite": 'container_4',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'logic',
      "contextOptions": 'loot',
      "description": 'A handy item container',
      "persist": 1
    },
    "events": {
      "onCreate": function (furni) {
        game.inventories.createInventoryForItem(furni, 4, 10, true);
      }
    },
    "parent": 'build_world_lootcontainers',
    "name": 'Medium Storage'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.unusedss_build_wall = {
    "sprite": 'icon_build_spot',
    "events": {
      "onCreate": function (item) {
        game.grid.updateTile(game.gridPos(this.x), game.gridPos(this.y), 4, 4, game.drawLayer);
        game.grid.drawWalls();
        item.data.job = 'buildwall';
        item.sync();
        game.offloader.addToIndex('jobs', item);
        item.alpha = 0.9;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          if (this.steps >= this.maxSteps) {
            caller.completeJob(this);
            this.alpha = 0;
          }
        };
      }
    },
    "parent": 'build_player_helpers',
    "name": 'UNUSED DELETE Build Wall'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.unused_ss_destroy_wall = {
    "sprite": 'icon_destroy_spot',
    "events": {
      "onCreate": function (item) {
        item.data.job = 'buildwall';
        item.sync();
        game.offloader.addToIndex('jobs', item);
        item.alpha = 0.9;
        item.steps = 0;
        item.jobAnim = 'build';
        item.maxSteps = 3;
        item.jobStep = function (data) {
          this.steps++;
          let caller = game.index.getFromIndex(data.callerId, 'all');
          caller.forceAnim = 'util/build_' + caller.data.dir;
          if (this.steps == this.maxSteps) {
            caller.completeJob(this);
            game.grid.updateTile(game.gridPos(this.x), game.gridPos(this.y), 1, 1, game.drawLayer);
            game.grid.drawWalls();
            this.alpha = 0;
          }
        };
      }
    },
    "parent": 'build_player_helpers',
    "name": 'UNUSED DELETE Destroy Wall'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.util_fireflies = {
    "sprite": 'icon_build_spot',
    "events": {
      "onCreate": function () {
        this.sparkX = 0;
        this.sparkY = 0;
        this.counter = 0;
        this._sprite.alpha = !!game.editMode;
        this.addTicker('move', () => {
          this.counter++;
          if (this.counter < 100) {
            return;
          }
          this.counter = 0;
          this.sparkX = game.rng(-150, 150);
          this.sparkY = game.rng(-150, 150);
          let sparkles = new Particles('flitter');
          sparkles.x = this.sparkX;
          sparkles.y = this.sparkY;
          sparkles.playOnceAndDestroy();
          this.addChild(sparkles);
        });
      }
    },
    "parent": 'build_util_objects',
    "name": 'Fireflies'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.util_flies = {
    "sprite": 'icon_build_spot',
    "events": {
      "onCreate": function () {
        this.sparkX = 0;
        this.sparkY = 0;
        this.counter = 0;
        this.addTicker('move', () => {
          this.counter++;
          if (this.counter < 100) {
            return;
          }
          this.counter = 0;
          let sparkles = new Particles('flies');
          sparkles.playOnceAndDestroy();
          this.addChild(sparkles);
        });
      }
    },
    "parent": 'build_util_objects',
    "name": 'Flies'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.vehicle_longpipebike = {
    "sprite": 'sprite_vehicle_longpipebike',
    "meta": {
      "physicsType": 'logic',
      "contextOptions": 'custom'
    },
    "events": {
      "onCreate": item => {
        item.sprites['up'] = 'sprite_vehicle_bikeup';
        item.sprites['down'] = 'sprite_vehicle_bikedown';
        item.sprites['right'] = 'sprite_vehicle_longpipebike';
        item.sprites['left'] = 'sprite_vehicle_longpipebike';
        item._sprite.anchor.set(0.5);
        item.addExtension('ext_vehicle', {
          doDriven: function (life) {
            life.driving = game.index.find(life.data.drivingId);
            if (!life.driving) {
              life.stopDriving();
              return;
            }
            game.grid.updateChunk(life.driving);
            life.data.do = "drive";
            life.data.lockedInPlace = true;
            life.driving.meta.sort = false;
            life.driving.zOrder = 0;
            if (!life.driving.animUp) {
              life.driving.animUp = 0;
            }
            life.driving.x = life.x - 50;
            life.driving.y = life.y - 20;
            life.rotation = 0;
            life.driving._sprite.x = 0;
            life.driving.y -= 2;
            if (life.data.dir == "right") {
              life.rotation = 25;
              life.driving._sprite.scale.x = 1;
              life.driving.changeSprite("right");
            }
            if (life.data.dir == "left") {
              life.rotation = -25;
              life.driving._sprite.x = life.driving._sprite.width;
              life.driving._sprite.scale.x = -1;
              life.driving.x = life.x - 100;
              life.driving.changeSprite("left");
            }
            if (life.data.dir == "up") {
              life.driving.x += 32;
              life.driving.changeSprite("up");
            }
            if (life.data.dir == "down") {
              life.driving.x += 32;
              life.driving.changeSprite("down");
            }
            if (life.driving.animUp == 10) {
              life.driving.y += 2;
              life.driving.animUp = 0;
            }
            life.driving.animUp++;
            life.setAnim("none/idle_" + life.data.dir, true);
            life.aim();
          }
        });
      }
    },
    "parent": 'build_vehicles',
    "name": 'Longpipe Bike'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_craftingbench = {
    "sprite": 'sprite_craftingworkbench',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        this.addExtension('ext_craftingbench', {
          bench: 'craftingbench'
        });
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_craftbench',
    "name": 'Crafting Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_materialbench = {
    "sprite": 'sprite_stonebench',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        item.data.recipeList = 'materialbench';
        this.addExtension('ext_craftingbench', {
          bench: 'materialbench'
        });
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_craftbench',
    "name": 'Material Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_campfire = {
    "sprite": 'sprite_campfire',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        item.data.recipeList = 'campfire';
        this.addExtension('ext_craftingbench', {
          bench: 'campfire'
        });
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_craftbench',
    "name": 'Campfire'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.pers_worlditem_smelter = {
    "sprite": 'sprite_smelter',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function (item) {
        item.data.recipeList = 'smelter';
        this.addExtension('ext_craftingbench', {
          bench: 'smelter'
        });
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "destroyBase": false,
    "parent": 'build_persistent_craftbench',
    "name": 'Smelter'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_chembench = {
    "sprite": 'sprite_chembench',
    "parent": 'build_persistent_craftbench',
    "name": 'Crafting Chem Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_loom = {
    "sprite": 'sprite_loom',
    "parent": 'build_persistent_craftbench',
    "name": 'Crafting Loom'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_smithy = {
    "sprite": 'sprite_smithy',
    "parent": 'build_persistent_craftbench',
    "name": 'Crafting Smithy'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_splicer = {
    "sprite": 'sprite_splicer',
    "meta": {
      "physicsType": 'helper',
      "contextOptions": 'loot',
      "recipe": 'pers_worlditem_materialbench'
    },
    "events": {
      "onCreate": function () {
        this.contextMenus['Place'] = function (item) {
          const SLEEP_TIMEOUT = 120000;
          if (!game.p) {
            return false;
          }
          const carrying = game.p.isCarrying();
          if (!carrying) {
            game.notify("Nothing to place");
            return false;
          }
          game.p.stopCarrying(carrying);
          carrying.addStatusFromClient('opready', {
            duration: SLEEP_TIMEOUT,
            source: this.id
          });
          carrying.x = item.x + 32;
          carrying.y = item.y;
          carrying.syncXY();
          carrying.addStatusFromClient('sleeping', {
            sleepX: item.x + 5,
            sleepY: item.y - 22,
            duration: SLEEP_TIMEOUT,
            source: this.id,
            canCancelWithMove: false
          });
        };
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "parent": 'build_persistent_craftbench',
    "name": 'Splicer'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_clonepod = {
    "sprite": 'w_emptyclonepod',
    "meta": {
      "physicsType": 'helper',
      "contextOptions": 'loot',
      "recipe": 'ss_clonepod'
    },
    "events": {
      "onCreate": function () {
        this.contextMenus['Place'] = function (item) {
          const SLEEP_TIMEOUT = 4000;
          if (!game.p) {
            return false;
          }
          const carrying = game.p.isCarrying();
          if (!carrying) {
            game.notify("Nothing to place");
            return false;
          }
          game.p.stopCarrying(carrying);
          carrying.addStatusFromClient('clonepod', {
            duration: SLEEP_TIMEOUT,
            source: this.id
          });
          carrying.x = item.x + 64 + 8;
          carrying.y = item.y + 64;
          carrying.syncXY();
        };
      },
      "onWorldTick": function () {
        this.hauls();
      }
    },
    "parent": 'build_persistent_craftbench',
    "name": 'Clone Pod'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_researchbench = {
    "sprite": 'sprite_craftbench2',
    "meta": {
      "blockZone": 'all',
      "collisionGroups": 'all',
      "physicsType": 'helper',
      "contextOptions": 'loot'
    },
    "events": {
      "onCreate": function () {
        game.inventories.createInventoryForItem(this, 10, 10, false);
        this.contextMenus['Research'] = caller => {
          let craft = game.render.component('hud_researchmenu', {
            crafter: this
          }, 'hud_bench_crafting');
          craft.x = 10;
          craft.y = 10;
          game.render.aboveAll.addChild(craft);
        };
        this.sync();
      }
    },
    "parent": 'build_persistent_craftbench',
    "name": 'Research Bench'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_wood_chair_l = {
    "sprite": 'sprite_wood_chair_l',
    "parent": 'build_furniture',
    "name": 'Wood Chair Left'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_wood_chair_r = {
    "sprite": 'sprite_wood_chair_r',
    "parent": 'build_furniture',
    "name": 'Wood Chair Right'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_wood_table_h = {
    "sprite": 'sprite_wood_table_h',
    "parent": 'build_furniture',
    "name": 'Wood Table Horizontal'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_wood_bookcase = {
    "sprite": 'sprite_wood_bookcase',
    "parent": 'build_furniture',
    "name": 'Wood Bookcase'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_yamabanzaipot = {
    "sprite": 'sprite_yamabanzaipot',
    "parent": 'build_furniture',
    "name": 'Yama Banzai Pot'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_yamashortpost = {
    "sprite": 'sprite_yamashortpost',
    "parent": 'build_furniture',
    "name": 'Yama Short Post'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_scrapbarrel = {
    "sprite": 'sprite_scrapbarrel',
    "parent": 'build_furniture',
    "name": 'Scrap Barrel'
  };
  _BLUEPRINTS.COMPLEX_ITEMS.ss_util_bedroll = {
    "sprite": 'sprite_bed',
    "meta": {
      "blockZone": 'all',
      "physicsType": 'helper'
    },
    "events": {
      "onCreate": function () {
        this.contextMenus['Sleep'] = function (item) {
          game.p.addStatusFromClient('sleeping', {
            sleepX: item.x + 5,
            sleepY: item.y - 22,
            duration: Infinity,
            source: this.id,
            canCancelWithMove: true
          });
        };
      }
    },
    "parent": 'build_furniture',
    "name": 'Bedroll'
  };
})();