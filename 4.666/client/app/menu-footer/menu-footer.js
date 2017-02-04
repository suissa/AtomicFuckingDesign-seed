document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('menu-btn').addEventListener("click", function () {
    toggleClass(document.getElementById('menu'), 'menu__opend');
    toggleClass(document.getElementById('menu-btn'), 'menu-btn__opend');
  });
  // document.getElementById('close-header').addEventListener("click", function() {
  //     toggleClass(document.getElementById('menu'), 'menu__opend');
  //     toggleClass(document.getElementById('menu-btn'), 'menu-btn__opend');
  // });
}, false);

function toggleClass(element, className) {
  if (!element || !className) {
    return;
  }

  var classString = element.className,
    nameIndex = classString.indexOf(className);
  if (nameIndex == -1) {
    classString += ' ' + className;
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
  }
  element.className = classString;
}
