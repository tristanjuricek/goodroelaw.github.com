// Initialize the jS on the page
//
// Depends upon jQuery being there

jQuery(function() {

    $("body").scrollspy({ target: "#navbar" });

    $(".expandable").expander();

    // Only show the branding in the top left when we are not focused on the
    // home page.
    $(".navbar-brand").hide();

    $("body").on("activate.bs.scrollspy", function() {
        var activeHref = $("#navbar ul li.active a").attr("href");
        if (activeHref === "#home") {
            $(".navbar-brand").hide();
        } else {
            $(".navbar-brand").show();
        }
    });

    // When clicking our submit button, we'll actually be generating a mailto:
    // link with the content of the message. Kind of hokey but there it is.
    $("#send-email").click(function() {
        var name = $("#contact-name").val();
        var email = $("#contact-email").val();
        var message = $("#contact-message").val();

        var info = {
            to: "Chris Goodroe <cgoodroe@goodroelaw.com>",
            from: name + " <" + email + ">",
            subject: "Request for Information",
            body: message
        };

        var mailtoLink =
            "mailto:" + encodeURIComponent(info.to) + "?" +
                "cc=" + encodeURIComponent(info.from) + "&" +
                "subject=" + encodeURIComponent(info.subject) + "&" +
                "body=" + encodeURIComponent(info.body);

        window.location = mailtoLink;
    });

    // When clicking the faq buttons, shift visibility of the major containers
    $("#faq-maritime-slides").hide();

    $("#faq-maritime").click(function() {
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $("#faq-injury").removeClass("active");
            $this.addClass("active");
            $("#faq-injury-slides").hide();
            $("#faq-maritime-slides").show();
        }
    });
    $("#faq-injury").click(function() {
        var $this = $(this);
        if (!$this.hasClass("active")) {
            $("#faq-maritime").removeClass("active");
            $this.addClass("active");
            $("#faq-injury-slides").show();
            $("#faq-maritime-slides").hide();
        }
    });

    // When toggling right arrows, move to the next item within the
    // slide deck.
    $("#faq-next").click(function() {
        var $slides = visibleFaqSlides();
        var $active = activeSlideIn($slides);
        if ($active.nextAll(".slide").size() > 0) {
            $active.nextAll(".slide").first().addClass("active").removeClass("hidden");
        } else {
            $slides.find(".slide").first().addClass("active").removeClass("hidden");
        }
        $active.removeClass("active").addClass("hidden");
    });
    $("#faq-prev").click(function() {
        var $slides = visibleFaqSlides();
        var $active = activeSlideIn($slides);
        if ($active.prevAll(".slide").size() > 0) {
            $active.prevAll(".slide").first().addClass("active").removeClass("hidden");
        } else {
            $slides.find(".slide").last().addClass("active").removeClass("hidden");
        }
        $active.removeClass("active").addClass("hidden");
    });


    // When toggling previous arrows, move to the prior item within the slide
    // deck.


    function visibleFaqSlides() {
        if ($("#faq-maritime-slides").is(":visible")) {
            return $("#faq-maritime-slides");
        } else {
            return $("#faq-injury-slides");
        }
    }

    function activeSlideIn($slides) {
        return $slides.find(".slide.active");
    }
});