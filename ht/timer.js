$(function() {
  var config;

  function timer(settings) {
    config = {
      // Cai dat ngay ket thuc
      endDate: "2019-08-11 00:00",
      // Cai dat time zone
      timeZone: "Asia/Ho_Chi_Minh",
      hours: $("#hours"),
      minutes: $("#minutes"),
      seconds: $("#seconds"),
      // Dong thong bao khi ket thuc dem nguoc
      newSubMessage: "and should be back online in a few minutes..."
    };

    function prependZero(number) {
      return number < 10 ? "0" + number : number;
    }

    $.extend(true, config, settings || {});
    var currentTime = moment();
    var endDate = moment.tz(config.endDate, config.timeZone);
    var diffTime = endDate.valueOf() - currentTime.valueOf();
    var duration = moment.duration(diffTime, "milliseconds");
    var days = duration.days();
    var months = duration.months();
    var interval = 1000;
    var subMessage = $(".sub-message");
    var clock = $(".clock");

    if (diffTime < 0) {
      endEvent(subMessage, config.newSubMessage, clock);
      return;
    }

    if (months > 0) {
      $("#months").text(prependZero(months));
      $(".months").css("display", "inline-block");
    }

    if (days > 0) {
      $("#days").text(prependZero(days));
      $(".days").css("display", "inline-block");
    }

    var intervalID = setInterval(function() {
      duration = moment.duration(duration - interval, "milliseconds");
      var hours = duration.hours(),
        minutes = duration.minutes(),
        seconds = duration.seconds();
      months = duration.months();
      days = duration.days();
      if (
        hours <= 0 &&
        minutes <= 0 &&
        seconds <= 0 &&
        days <= 0 &&
        months <= 0
      ) {
        clearInterval(intervalID);
        endEvent(subMessage, config.newSubMessage, clock);
        window.location.reload();
      }
      if (months === 0) {
        $(".months").hide();
      }
      if (days === 0) {
        $(".days").hide();
      }
      $("#months").text(prependZero(months));
      $("#days").text(prependZero(days));
      config.hours.text(prependZero(hours));
      config.minutes.text(prependZero(minutes));
      config.seconds.text(prependZero(seconds));
    }, interval);
  }

  function endEvent($el, newText, hideEl) {
    //         config.endDate.replace(config.endDate.slice(0,4), parseInt(config.endDate.slice(0,4)) + 1);
    $el.text(newText);
    hideEl.hide();
    window.location.replace("https://duonghan.github.io/birthday");
  }

  timer();
});
