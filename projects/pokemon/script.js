var teamList = ['instinct', 'mystic', 'valor'];
var colors = {
  "instinct": ['rgba(255, 220, 0, 0.6)', 'rgba(255, 133, 27, 0.5)'],
  "mystic": ['rgba(0, 31, 63, 0.6)', 'rgba(0, 116, 217, 0.6)'],
  "valor": ['rgba(255, 65, 54, 0.6)', 'rgba(133, 20, 75, 0.6)'],
}
var teamChoice = null;
var uploadedImage = null;


// Handle Team Choices
function handleClick(event) {
  for (el in teamList) {
    document.getElementById(teamList[el]).classList.remove('selected');
  }

  event.target.classList.add('selected');
  teamChoice = event.target.id;

  if (uploadedImage !== null) {
    applyFilters();
  }
}

// Big images break data uri downloads on Chrome, so convert to blob
function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(',');
  var mime = arr[0].match(/:(.*?);/)[1];
  var bstr = atob(arr[1]);
  var n = bstr.length;
  var u8arr = new Uint8Array(n);

  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], {type:mime});
}

function downloadImage() {
  var canvas = document.getElementById('canvas');
  var a = document.createElement('a');

  a.href = URL.createObjectURL(dataURLtoBlob(canvas.toDataURL('image/png')));
  a.download = 'image.png';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function uploadImage() {
  var file = this.files[0];
  var imageType = /^image\//;

  if (!imageType.test(file.type)) {
    alert('Please choose an image!');
    return;
  }

  var img = new Image();
  img.file = file;

  var reader = new FileReader();
  reader.onload = (function(aImg) {
    return function(e) {
      aImg.src = e.target.result;
      aImg.onload = function() {
        uploadedImage = aImg;
        applyFilters();
      }
    };
  })(img);

  reader.readAsDataURL(file);
}

function applyFilters() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    // Resize canvas according to uploaded image
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    canvas.style.height = 600 * (uploadedImage.height / uploadedImage.width) + 'px';

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(uploadedImage, 0, 0);

    // Apply the Gradient
    if (teamChoice !== null) {
      var gradientCanvas = document.createElement('canvas');
      var gradientContext = gradientCanvas.getContext('2d');
      var gradient = gradientContext.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop('0', colors[teamChoice][0]);
      gradient.addColorStop('0.5', colors[teamChoice][1]);
      gradient.addColorStop('1.0', colors[teamChoice][0]);
      gradientContext.fillStyle = gradient;
      gradientContext.fillRect(0, 0, canvas.width, canvas.height);

      context.globalCompositeOperation = 'multiply';
      context.drawImage(gradientCanvas, 0, 0, canvas.width, canvas.height);
    }

    // Apply the Logo
    if (teamChoice !== null) {
      var logo = new Image();
      logo.src = window.location + teamChoice + '.svg';
      logo.onload = function() {
        // Thanks Firefox
        if (!logo.complete) {
          logo.src = logo.src;
          return;
        }

        logo.height = uploadedImage.height / 3;
        logo.width = logo.height;

        context.globalCompositeOperation = 'screen';
        context.drawImage(logo, canvas.width - logo.width - 10,
                                canvas.height - logo.height - 10,
                                logo.width,
                                logo.height);
      }
    }
  }
}

function initialize() {
  var button = document.getElementById('download');
  button.addEventListener('click', downloadImage);

  var input = document.getElementById('upload');
  input.addEventListener('change', uploadImage, false);

  for( el in teamList) {
    document.getElementById(teamList[el]).addEventListener('click', handleClick);
  }
}

initialize();
