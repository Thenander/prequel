/**
 * @param {String} element Element to change opacity on
 * @param {Number} innerHeight Height of Viewport
 */
window.onload = () => {
  /**
   *********************************
   ********* COOKIE CONSENT ********
   *********************************
   */
  setTimeout(() => {
    $('#cookieConsent').fadeIn(200)
  }, 1000)
  $('.cookieConsentOK').click(function () {
    $('#cookieConsent').fadeOut(200)
  })

  /**
   *****************************
   ********* VARIABLES *********
   *****************************
   */
  const windowWidth = document.documentElement.clientWidth
  const orderFromBandcamp = document.getElementById('order-from-bandcamp')
  const stickyDownload = document.getElementById('sticky-download')
  const header = document.getElementById('small-bimbo-header')
  const footer = document.getElementById('small-bimbo-footer')
  const teaserVid = document.getElementById('center-start')
  const orderStart = document.getElementById('order-start')
  const total = document.getElementsByTagName('body')
  const social = document.getElementById('fb')
  const introductionUrl = './jsons/introduction.json'
  const cassettesUrl = './jsons/cassettes.json'
  const allTracksUrl = './jsons/allTracks.json'
  const unsortedUrl = './jsons/unsorted.json'
  const history2Url = './jsons/history2.json'
  const projectsUrl = './jsons/projects.json'
  const theRestUrl = './jsons/theRest.json'
  const historyUrl = './jsons/history.json'
  const orderContainer =
    '<br />' +
    '<br />' +
    '<hr />' +
    '<div class="row">' +
    '<img src="img/cd_cover.jpg" alt="..." class="col-sm-5" />' +
    '<div class="order col-sm-7">' +
    '<a href="https://cultivatedbimbo.bandcamp.com/album/prequel-extended" target="blank">' +
    '<img src="img/order_off.png" alt="..." class="img-fluid orderOff" />' +
    '<img src="img/order_on.png" alt="..." class="img-fluid orderOn" />' +
    '</a>' +
    '</div>' +
    '</div>' +
    '<hr />' +
    '<br />' +
    '<br />'

  if (teaserVid) {
    if (windowWidth > 767) {
      teaserVid.innerHTML =
        '<video autoplay muted loop class="teaser-video">' +
        '<source src="img/teaservideo.mp4" type="video/mp4" />' +
        '</video>'
    } else {
      teaserVid.innerHTML =
        '<img src="img/teaser_small.gif" alt="Cultivated Bimbo Logo" class="teaser-video"/>'
    }
  }

  // Sets unique ID on every image that has class 'figure'
  reNamingImages = () => {
    let images = document.getElementsByClassName('figure')
    for (let i = 0; i < images.length; i++) images[i].id = i
  }

  reNamingImages()

  window.onscroll = () => {
    // Variables
    const scrollY = window.scrollY
    const docHeight = total[0].scrollHeight
    const scrollBottom = window.scrollY + this.innerHeight
    const opac0 = this.innerHeight / 8
    const opac1 = (this.innerHeight / 8) * 4
    const midPoint = this.innerHeight / 2
    const fadeIn = docHeight - midPoint - opac0
    const fadeOut = docHeight - midPoint - opac1
    const socialOpacity =
      (scrollY + this.innerHeight - midPoint - fadeOut) /
      ((fadeIn - fadeOut) / 100) /
      100

    // Opacity = 0, when scrolled to absolute start or absolute end.
    const opacity =
      docHeight - scrollBottom
        ? scrollY - this.innerHeight / 2
        : docHeight - scrollBottom

    // Header/Footer animation
    header.style.opacity = opacity
    footer.style.opacity = opacity
    stickyDownload.style.opacity = opacity
    social.style.opacity = socialOpacity

    // Download link animation
    if (scrollY < 0) {
      stickyDownload.style.right = '-200px'
    } else if (scrollY > 240) {
      stickyDownload.style.right = '-18px'
      stickyDownload.style.top = '50px'
    }
  }

  if (orderFromBandcamp) {
    stickyDownload.innerHTML =
      '<p>' +
      '<a href="https://cultivatedbimbo.bandcamp.com/album/prequel-extended" target="blank">Download!</a>' +
      '</p>'
  }

  this.document.getElementById('top-container').innerHTML =
    '<a href="#"><img src="img/bimbo-top.gif" alt="..." class="img-fluid" /></a>'

  this.document.getElementById('footer').innerHTML =
    '<div class="" >' +
    '<img id="footerImg" src="img/prequel-bottom.gif" alt="..." class="img-fluid" />' +
    '</div >'

  /**
   ********* **** *********
   ********* MAIN *********
   ********* **** *********
   */
  this.document.getElementById('prequel').innerHTML =
    '<div id="main" class="col-xl-8 col-lg-7 col-md-6"></div>' +
    '<div id="tracklist" class="col-xl-4 col-lg-5 col-md-6"></div>'

  /**
   ********* ********* *********
   ********* TRACKLIST *********
   ********* ********* *********
   */
  fetch(allTracksUrl)
    .then((response) => response.json())
    .then((tracks) => {
      this.document.getElementById('tracklist').innerHTML =
        '<br />' + '<h3>Prequel Extended tracklist</h3>' + '<ol id="list"></ol>'
      tracks.forEach((track) => {
        this.document.getElementById('list').innerHTML +=
          '<li>' + track.name + '</li>'
      })
    })
    .catch(() => {
      this.document.getElementById('track-list').innerHTML +=
        '<p>ERROR! Cannot connect to server...</p>'
    })

  /**
   ********* ************ *********
   ********* INTRODUCTION *********
   ********* ************ *********
   */
  this.document.getElementById('main').innerHTML =
    '<h3>History</h3>' +
    '<div id="slamJam"></div>' +
    '<div id="history"></div>' +
    '<div id="historyImg"></div>' +
    '<div id="history2"></div>' +
    '<div id="summer"></div>' +
    '<div id="projects"></div>'

  fetch(introductionUrl)
    .then((response) => response.json())
    .then((res) => {
      this.document.getElementById('introduction').innerHTML =
        '<br />' +
        '<h2>Prequel Extended</h2>' +
        '<hr />' +
        '<div id="introductionTxt">' +
        '<h3>Introduction</h3>' +
        '<div class="bimbo-image col-lg-4 col-md-5 col-sm-6 float-right" >' +
        '<figure class="figure">' +
        '<img src="img/unconstitutional.jpg" alt="..." class="rounded img-fluid" />' +
        '</figure>' +
        '</div >' +
        '</div > '
      res.forEach((e) => {
        this.document.getElementById('introductionTxt').innerHTML +=
          '<p style="white-space: pre-line;">' + e.paragraph + '</p>'
      })

      // TODO
      this.document.getElementById('introduction').innerHTML +=
        '<a href="https://cultivatedbimbo.bandcamp.com/" target="_blank"><div id="tba" class="bcLink tba" style="font-size: 20px; padding: 10px 20px;" >Get your copy from Bandcamp today!<br />CLICK HERE!</div></a>'
      // END

      // BANDCAMP
      this.document.getElementById('introduction').innerHTML +=
        '<iframe scrolling="no" style="border: 0; width: 100%; height: 33px" src="https://bandcamp.com/band_follow_button_classic/964649588"></iframe>'

      // TODO
      this.document.getElementById('introduction').innerHTML +=
        '<div id="tba" class="tba" style="color: #042767; font-weight: 400;"><img src="./img/soldOut.png" alt="sold out" style="width: 160px; float: right; margin-top: 5px; transform: rotate(-10deg);" />Limited edition USB-series also available! <br />PROUSB010 (Progress Productions). Limited to 100 handnumbered copies worldwide.</div>'
      // END

      this.document.getElementById('introduction').innerHTML += '<hr />'
    })
    .catch(() => {
      this.document.getElementById('introduction').innerHTML +=
        '<p>ERROR! Cannot connect to server...</p>'
    })

  /**
   ********* ******* *********
   ********* HISTORY *********
   ********* ******* *********
   */
  // IMAGE (Slam Jam Dynamite)
  this.document.getElementById('slamJam').innerHTML =
    '<div class="bimbo-image col-lg-4 col-md-5 col-sm-6 float-right">' +
    '<figure class="figure">' +
    '<img src="img/london.jpg" alt="..." class="rounded img-fluid" />' +
    '</figure>' +
    '</div>'

  // HISTORY part 1/2
  fetch(historyUrl)
    .then((response) => response.json())
    .then((res) => {
      res.forEach((e) => {
        this.document.getElementById('history').innerHTML +=
          '<p>' + e.paragraph + '</p>'
      })
    })
    .catch(() => {
      this.document.getElementById('history').innerHTML +=
        '<p>ERROR! Cannot connect to server...</p>'
    })

  // IMAGE (Angsttraum)
  this.document.getElementById('historyImg').innerHTML +=
    '<div class="bimbo-image col-lg-6 float-right">' +
    '<figure class="figure">' +
    '<img src="img/angsttraum.png" alt="..." class="rounded img-fluid"/>' +
    '</figure>' +
    '</div>'

  // HISTORY part 2/2
  fetch(history2Url)
    .then((response) => response.json())
    .then((res) => {
      res.forEach((e) => {
        this.document.getElementById('history2').innerHTML +=
          '<p>' + e.paragraph + '</p>'
      })
    })
    .catch(() => {
      this.document.getElementById('history').innerHTML +=
        '<p>ERROR! Cannot connect to server...</p>'
    })

  // IMAGE (Buddhas Besättning)
  this.document.getElementById('summer').innerHTML =
    '<div class="bimbo-image">' +
    '<figure class="figure">' +
    '<img src="img/summer.jpg" alt="..." class="rounded img-fluid"/>' +
    '</figure>' +
    '</div>'

  /**
   ********* ******** *********
   ********* PROJECTS *********
   ********* ******** *********
   */
  fetch(projectsUrl)
    .then((response) => response.json())
    .then((projects) => {
      this.document.getElementById('projects').innerHTML =
        '<br />' +
        '<h2>Projects</h2>' +
        '<hr />' +
        '<div id="projectList"></div>'
      projects.forEach((project, idx) => {
        if (idx === 1) {
          this.document.getElementById('projectList').innerHTML +=
            '<div class="bimbo-image col-lg-6 float-right">' +
            '<figure class="figure">' +
            '<img src="img/odahl.jpg" alt="..." class="rounded img-fluid"/>' +
            '</figure>' +
            '</div>'
        }
        if (idx === 5) {
          this.document.getElementById('projectList').innerHTML +=
            '<div class="bimbo-image col-lg-6 float-right">' +
            '<figure class="figure">' +
            '<img src="img/dieDieMauerBauPromo1.jpg" alt="..." class="rounded img-fluid"/>' +
            '</figure>' +
            '</div>'
        }
        this.document.getElementById('projectList').innerHTML +=
          '<h3>' +
          project.name +
          '</h3><p style="white-space: pre-line;">' +
          project.info +
          '</p>'
      })
      this.document.getElementById('projects').innerHTML +=
        '<div class="bimbo-image">' +
        '<figure class="figure">' +
        '<img src="img/cx5m.png" alt="..." class="rounded col-lg-8 img-fluid"/>' +
        '</figure>' +
        '</div>'
    })
    .catch(() => {
      this.document.getElementById('projects').innerHTML +=
        '<p>ERROR! Cannot connect to server...</p>'
    })

  /**
   ********* ********* *********
   ********* CASSETTES *********
   ********* ********* *********
   */
  fetch(cassettesUrl)
    .then((response) => response.json())
    .then((cassettes) => {
      this.document.getElementById('cassettes').innerHTML =
        '<br />' + '<h2>The cassettes</h2>' + '<div id="cassetteList"></div>'
      cassettes.forEach((cassette) => {
        let unreleased = ''
        if (cassette.unreleased) unreleased = '<i>Unreleased</i>'

        this.document.getElementById('cassetteList').innerHTML +=
          '<hr />' +
          '<div class="row">' +
          '<div class="col-lg-3 col-md-4 col-sm-5 img-fluid">' +
          '<figure class="figure cassettes">' +
          '<img src="img/' +
          cassette.img +
          '.jpg" alt="Picture of demo cassette" class="img-fluid"/>' +
          '</figure>' +
          '</div>' +
          '<div class="col-lg-9 col-md-8 col-sm-7">' +
          '<h3 class="cassette-header" > ' +
          cassette.name +
          '</h3>' +
          '<p><span>Tracklist: </span>' +
          cassette.tracklist +
          '</p>' +
          '<p><span>Members: </span>' +
          cassette.members +
          '</p>' +
          '<p><span>Equipment used: </span>' +
          cassette.equipment +
          '</p>' +
          '<p><span>Recorded: </span>' +
          cassette.recorded +
          '</p>' +
          unreleased +
          '</div>' +
          '</div>'
      })
    })

  /**
   ********* ******** *********
   ********* THE REST *********
   ********* ******** *********
   */
  fetch(theRestUrl)
    .then((response) => response.json())
    .then((e) => {
      this.document.getElementById('theRest').innerHTML =
        '<br />' +
        '<h2>The rest</h2>' +
        '<hr />' +
        '<p style="white-space: pre-line;">' +
        e.paragraph +
        '</p>'
    })

  /**
   ********* ******** *********
   ********* UNSORTED *********
   ********* ******** *********
   */
  fetch(unsortedUrl)
    .then((response) => response.json())
    .then((unsortedCassette) => {
      this.document.getElementById('unsorted').innerHTML =
        '<div id="unsortedList"></div>'

      this.document.getElementById('unsortedList').innerHTML =
        '<div>' +
        '<div class="bimbo-image float-right">' +
        '<figure class="figure">' +
        '<img src="img/20-Cassette.jpg" alt="..." class="img-fluid"/>' +
        '</figure>' +
        '</div>' +
        '<h3 class="cassette-header">' +
        unsortedCassette.name +
        '</h3>' +
        '<p><span>Tracklist: </span></p >' +
        '<div id="bandList"></div>' +
        '<p><span>Members: </span>' +
        unsortedCassette.members +
        '</p>' +
        '<p><span>Equipment used: </span>' +
        unsortedCassette.equipment +
        '</p>' +
        '<p><span>Recorded: </span>' +
        unsortedCassette.recorded +
        '</p>' +
        '<i>Unreleased</i>' +
        '</div>' +
        '<hr />'

      unsortedCassette.tracklist.forEach((e, idx) => {
        const num = ('0' + (idx + 1)).slice(-2)
        this.document.getElementById('bandList').innerHTML +=
          '<p>' + num + '. ' + e.track + '</p>'
      })
    })

  /**
   ********* ***** *********
   ********* ORDER *********
   ********* ***** *********
   */
  if (orderStart) {
    orderStart.innerHTML = '<div id="order"></div>'
    this.document.getElementById('order').innerHTML = orderContainer
  }
  if (orderFromBandcamp) orderFromBandcamp.innerHTML = orderContainer
}
