javascript: (function (undefined) {

    /* only do stuff on the movie ratings pages */
    if ( !document.URL.match(/movies.netflix.com\/MoviesYouveSeen/) ) {
        return;
    }

    var req = new XMLHttpRequest();
    var movies = document.getElementsByClassName('agMovie');

    for (var i in movies) {
        /* skip over any weird agMovie elements */
        if (typeof movies[i].getElementsByTagName === 'function') {
            var columns = movies[i].getElementsByTagName('td');

            /* skip over any weird columns */
            if (columns[0] == null) {
                continue;
            }

            /* this is probably doomed to fail in the future - anchors 0-5 are star ratings and 'not interested';
               the 6th anchor is the 'clear' url */
            var url = movies[i].getElementsByTagName('td')[1].getElementsByTagName('a')[6].href;
            var title = movies[i].getElementsByTagName('td')[0].innerText;

            var rating;
            if (movies[i].getElementsByTagName('td')[1].innerText.match(/You rated this movie: \d/)) {
                rating = movies[i].getElementsByTagName('td')[1].innerText.match(/You rated this movie: (\d)/)[1];
            } else {
                rating = 'not interested';
            }

            /* actually clear the rating */
            console.log('Clearing ' + title + ' (' + rating + ')');
            req.open('GET', url, false);
            req.send(null);
        }
    }

    /* the next page link at the bottom will be disabled on the last page */
    var nextlink = document.getElementsByClassName('next')[0];
    if (nextlink.className.indexOf('next-disabled') == -1) {
        console.log('Going to next page: ' + nextlink.href);
        window.location = nextlink.href;
    } else {
        console.log('complete');
        alert('No more ratings to clear!');
    }
})();
