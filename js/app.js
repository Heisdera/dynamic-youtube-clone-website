import get from './getElement.js';
import { data1, data2, data3 } from './data.js';

const sidebarToggle = get('.sidebar-toggle');
const sidebar = get('.sidebar');
const wrapper = get('.wrapper');
const sectionOne = get('.section-one');
const sectionTwo = get('.section-two');
const sectionShorts = get('.grid');
const searchBox = get('.search-box');
const searchInput = get('.search-input');

sidebarToggle.addEventListener('click', () => {
  sidebar.classList.toggle('hide');
  wrapper.classList.toggle('hide');
});

let filteredData1 = [...data1];
let filteredData3 = [...data3];

const displayShowcaseContent = (dataType, element) => {
  // showcase-content
  element.innerHTML = dataType
    .map((data) => {
      const { name, displayImage, channelImage, info, views, date, duration } =
        data;

      return `
			<div class="content">
        <div class="img">
          <div class="duration">
            <h5>${duration}</h5>
          </div>
          <img src="${displayImage}" alt="${name}" />
        </div>
        <div class="content-info">
          <div>
            <img src="${channelImage}" alt="${name}" />
          </div>
          <div>
            <h3>${info}</h3>
            <a href="#">
              ${name}
              <br />
              ${views} &bullet; ${date}
            </a>
          </div>
        </div>
      </div>
		`;
    })
    .join('');
};

const displayShowcaseShorts = (dataType, element) => {
  // showcase-shorts
  element.innerHTML = dataType
    .map((data) => {
      const { displayImage, info, views } = data;
      return `
			<div class="content-shorts">
        <div class="short-videos">
          <img src="${displayImage}" alt="" />
          <h3>${info}</h3>
          <a href="#">${views}</a>
        </div>
      </div>
		`;
    })
    .join('');
};

window.addEventListener('DOMContentLoaded', function () {
  // display showcase-content 1
  displayShowcaseContent(data1, sectionOne);

  // display showcase-content 2
  displayShowcaseContent(data3, sectionTwo);

  // display showcase-short
  displayShowcaseShorts(data2, sectionShorts);
});

// Filtering the Videos by info
const filter = (filterData, data, section) => {
  const inputValue = searchInput.value.toLowerCase();
  filterData = data.filter((item) => {
    return item.info.toLowerCase().includes(inputValue);
  });
  displayShowcaseContent(filterData, section);

  if (filterData.length < 1) {
    return (section.innerHTML = `<h6>Sorry, no video matched your search</h6>`);
  }
};

searchBox.addEventListener('keyup', () => {
  filter(filteredData1, data1, sectionOne);
  filter(filteredData3, data3, sectionTwo);
});
