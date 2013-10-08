instaStream = new Meteor.Stream('insta');

if (Meteor.isServer) {
  Meteor.startup(function () {
    var insta = Meteor.require('insta-stream');
    var Instagram = new insta({client_id: 'client_id',
                              client_secret: 'client_secret'});

    Instagram.stream('popular', '', function(stream) {
      stream.on('data', function(data) {
        console.log('====> receiving ' + data.length + ' new posts');
        _.each(_.first(data, 4), function(media) {
          var caption = ''
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
    });
  });
}
