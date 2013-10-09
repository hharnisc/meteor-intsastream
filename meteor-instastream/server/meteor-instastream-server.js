instaStream = new Meteor.Stream('insta');

if (Meteor.isServer) {
  var instagram = Meteor.require('instagram').createClient('<client_id>', '<client_secret>');
  Meteor.setInterval(function () {
    instagram.media.popular(function (images, error) {
      _.each(_.first(images, 4), function(media) {
        var caption = '';
        if (media.caption) {
          caption = media.caption.text
        }
        instaStream.emit('update', {caption: caption, 
          image: media.images.standard_resolution.url,
          likes: media.likes.count,
          user: media.user.username
        });
      });
    });
  }, 3000);

}