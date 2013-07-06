require(['Timeline'], function(Timeline) {
  var Entity, context, entity, lastTimestamp, tl, update;
  Entity = (function() {
    function Entity() {
      this.anis = [];
      this.x = 10;
      this.y = 10;
      this.alpha = 1;
    }

    Entity.prototype.addAni = function(ani) {
      return this.anis.push(ani);
    };

    Entity.prototype.clearAnis = function() {
      return this.anis = [];
    };

    Entity.prototype.update = function(delta) {
      var ani, _i, _len, _ref, _results;
      _ref = this.anis;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ani = _ref[_i];
        _results.push(ani.update(delta));
      }
      return _results;
    };

    Entity.prototype.draw = function(context) {
      context.save();
      context.fillStyle = "rgba(255, 0, 0, " + this.alpha + ")";
      if (this.scale != null) {
        context.scale(this.scale, this.scale);
      }
      context.fillRect(this.x, this.y, 10, 10);
      return context.restore();
    };

    return Entity;

  })();
  entity = new Entity();
  tl = new Timeline(entity);
  tl.forever(function(tl) {
    tl.together(function(tl) {
      tl.fadeOut({
        duration: 2000
      });
      tl.scale({
        from: 1,
        to: 3,
        duration: 2000
      });
      return tl.move({
        from: {
          x: 10,
          y: 10
        },
        to: {
          x: 300,
          y: 100
        },
        duration: 2000,
        easingX: 'easeInOutQuad'
      });
    });
    tl.wait(500);
    return tl.together(function(tl) {
      tl.scale({
        from: 3,
        to: 1,
        duration: 2000
      });
      tl.fadeIn({
        duration: 2000
      });
      return tl.move({
        from: {
          x: 300,
          y: 100
        },
        to: {
          x: 10,
          y: 10
        },
        duration: 2000,
        easingX: 'easeInOutQuad'
      });
    });
  });
  context = document.getElementById('canvas').getContext('2d');
  lastTimestamp = null;
  update = function(ts) {
    var delta;
    if (lastTimestamp == null) {
      lastTimestamp = ts;
    }
    delta = ts - lastTimestamp;
    lastTimestamp = ts;
    entity.update(delta);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    entity.draw(context);
    return window.requestAnimationFrame(update);
  };
  return update(0);
});
