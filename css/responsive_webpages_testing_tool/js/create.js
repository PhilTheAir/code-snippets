function disappear() {
    document.getElementById('init-bg').style.display = 'none';
    document.getElementById('init-op').style.display = 'none';
    var website = document.getElementById('website-address').value;
    for (var property in deviceWrapClass) {
        if (deviceWrapClass.hasOwnProperty(property)) {
            createDivs(deviceWrapClass[property], deviceClass[property], flashingTopClass[property], titleClass[property], innerHTML[property], website);
        }
    }
    // createDivs(deviceWrapClass.iPhone5Portrait, deviceClass.iPhone5Portrait, titleClass.iPhone5Portrait, innerHTML.iPhone5Portrait, website);
    // createDivs(deviceWrapClass.iPhone6Portrait, deviceClass.iPhone6Portrait, titleClass.iPhone6Portrait, innerHTML.iPhone6Portrait, website);
    // createDivs(deviceWrapClass.iPhone6PlusPortrait, deviceClass.iPhone6PlusPortrait, titleClass.iPhone6PlusPortrait, innerHTML.iPhone6PlusPortrait, website);
    // createDivs(deviceWrapClass.iPadPortrait, deviceClass.iPadPortrait, titleClass.iPadPortrait, innerHTML.iPadPortrait, website);
    // createDivs(deviceWrapClass.iPadLandscape, deviceClass.iPadLandscape, titleClass.iPadLandscape, innerHTML.iPadLandscape, website);
    // createDivs(deviceWrapClass.macbookPro13, deviceClass.macbookPro13, titleClass.macbookPro13, innerHTML.macbookPro13, website);
    // createDivs(deviceWrapClass.macbookAir11, deviceClass.macbookAir11, titleClass.macbookAir11, innerHTML.macbookAir11, website);
    // createDivs(deviceWrapClass.macbookAir13, deviceClass.macbookAir13, titleClass.macbookAir13, innerHTML.macbookAir13, website);
    // createDivs(deviceWrapClass.imac1600, deviceClass.imac1600, titleClass.imac1600, innerHTML.imac1600, website);
}

function createDivs(deviceWrapClass, deviceClass, flashingTopClass, titleClass, innerHTML, website) {
    var deviceWrap = document.createElement('div');
    deviceWrap.className += ' ' + deviceWrapClass;

    var device = document.createElement('div');
    device.className += ' ' + deviceClass;

    var flashingTop = document.createElement('div');
    flashingTop.className += ' ' + flashingTopClass + ' ' + titleClass;
    flashingTop.innerHTML = innerHTML;

    var iframe = document.createElement('iframe');
    iframe.setAttribute("id", deviceWrapClass);
    iframe.className += ' ' + deviceClass;
    iframe.src = website;

    device.appendChild(flashingTop);
    device.appendChild(iframe);
    deviceWrap.appendChild(device);
    document.body.appendChild(deviceWrap);
}