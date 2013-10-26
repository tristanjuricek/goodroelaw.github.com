// Initialize the jS on the page
//
// Depends upon jQuery being there

jQuery(function() {

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
});