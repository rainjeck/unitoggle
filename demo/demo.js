// EXAMPLE 1
const toggler1 = new Unitoggle.default({
  container: '#example1'
});

// EXAMPLE 2
const toggler2 = new Unitoggle.default({
  container: '#example2'
});

// EXAMPLE 3
const toggler3 = new Unitoggle.default({
  container: '#example3'
});

// EXAMPLE 4
const toggler4 = new Unitoggle.default({
  container: '#example4',
  activateInputs: true
});

// EXAMPLE 6
const toggler6 = new Unitoggle.default({
  container: '#example6'
});

// EXAMPLE 5
const toggler5 = new Unitoggle.default({
  container: '#example5'
});

let countButtons = 1;

function createToggler() {
  const container = document.querySelector('#new-togglers');
  const tab = document.createElement('div');
  tab.classList.add('panel-item');

  tab.innerHTML = `
    <button type='button' data-toggle='created-toggler${countButtons}' class='button button-control'>Toggle Button ${countButtons}</button>
    <div class='tab tab-demo' id='created-toggler${countButtons}'>
      <p>Content Toggle Button ${countButtons}</p>
      <p><button type='button' class='button' data-toggle='created-toggler${countButtons}'>Close</button></p>
    </div>
  `;

  container.appendChild(tab);

  countButtons++;
}

document.querySelector('#create-toggler').addEventListener('click', createToggler);
