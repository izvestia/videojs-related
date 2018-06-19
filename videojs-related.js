videojs.registerPlugin('related', function (config) {

    if (!(typeof config.list !== 'undefined' && config.list.length)) {

    } else {

        config = config || {
                title: 'Похожее',
                target: 'self',
                list: [{
                    title:  '',
                    url:    '',
                    image:  '',
                    target: 'self' // blank, self, this
                }]
            };
        var player = this;
        var container;

        /**
         * Когда плеера закончил играть
         */
        player.on('ended', function (e) {

            if (!document.querySelector('.vjs-ad-playing')) {
                container.classList.add('vjs-related-video-active');
            }

        });

        /**
         * Добавляет кнопку
         */
        player.ready(function () {

            var relatedButton       = document.createElement('span');
            relatedButton.id        = 'vjs-related-video-open-button';
            relatedButton.className = 'vjs-related-video-open vjs-icon-chapters';
            player.el().appendChild(relatedButton);

            //
            var relatedButtonInfo       = document.createElement('span');
            relatedButtonInfo.id        = 'vjs-related-video-open-button-info';
            relatedButtonInfo.innerText = config.title;
            player.el().appendChild(relatedButtonInfo);

            config.target = config.target || 'self';

            var list     = config.list;
            var fragment = document.createDocumentFragment();
            var aside    = document.createElement('aside');
            var div      = document.createElement('div');
            var title    = document.createElement('h5');
            var close    = document.createElement('span');

            aside.id        = 'vjs-related-video';
            aside.className = 'vjs-related-video';
            div.className   = 'vjs-related-video-container';

            title.innerHTML = config.title;
            title.className = 'vjs-related-video-title';

            close.className = 'vjs-related-video-close vjs-icon-cancel';
            close.id        = 'vjs-related-video-close-button';

            aside.appendChild(title);
            aside.appendChild(close);

            // Ограничение на 6 ссылок
            var i = list.length - 1;
            var a;
            var img;
            var span;
            for (; i >= 0; --i) {

                a = document.createElement('a');
                a.className = 'vjs-related-video-url';
                a.href      = list[i].url;
                a.target    = '_' + (list[i].target || config.target);

                img = document.createElement('img');
                img.className = 'vjs-related-video-img';
                img.src       = list[i].image;
                img.alt       = list[i].alt || list[i].title;
                a.appendChild(img);

                span = document.createElement('span');
                span.className = 'vjs-related-video-url-title';
                span.innerHTML += list[i].title;
                a.appendChild(span);

                div.insertBefore(a, div.children[0]);

            }

            aside.appendChild(div);
            container = aside;
            fragment.appendChild(aside);
            player.el().appendChild(fragment);

            if ('addEventListener' in close) {
                close.addEventListener('click', function () {
                    container.classList.remove('vjs-related-video-active');
                    if (player.el().firstChild.paused) {
                        player.play();
                    }
                });
            } else if ('attachEvent' in close) {
                close.attachEvent('click', function () {
                    container.classList.remove('vjs-related-video-active');
                    if (player.el().firstChild.paused) {
                        player.play();
                    }
                });
            }

            relatedButton.addEventListener('click', function () {
                player.pause();
                container.classList.add('vjs-related-video-active');
            });

        });

    }

});
