const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_DIR = 'C:/Users/User/Documents/GitHub/Nova_project_site/avantgarde-site';

function download(url, destPath) {
  return new Promise((resolve, reject) => {
    const dest = path.join(BASE_DIR, destPath);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const stream = require('stream');
    const fileStream = fs.createWriteStream(dest);
    https.get(url, {rejectUnauthorized: false}, (res) => {
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded: ${destPath}`);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}: ${err.message}`);
      reject(err);
    });
  });
}

async function main() {
  // All images from the homepage
  const images = [
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/685afd173b20415eb2c90794_IMG_0154%20copy.jpeg', dest: 'images/home/IMG_0154_copy.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/69ef717e6dbcc74d70041a2b_Arty%20photo%201%20BW.jpg', dest: 'images/home/Arty_photo_1_BW.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/685afb46ebd058e57fcfa9d4_774A2061_(2)_OK.jpeg', dest: 'images/home/774A2061_2_OK.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/685afd8345bf8bde08a86974_WhatsApp%20Image%202024-07-11%20at%2016.23.43.jpeg', dest: 'images/home/WhatsApp_Image_2024.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/685b04adb26f48b73e78ff20_7U0A5311%202.jpg', dest: 'images/home/7U0A5311_2.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/66f6d04b618990253c42118f_Frame%201321317381.svg', dest: 'images/icons/Frame_1321317381.svg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/66f6cf7afef6280bd235e559_Group%201000002831.svg', dest: 'images/icons/Group_1000002831.svg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/66f6cf7af3d2577acd316868_Group%201000002832.svg', dest: 'images/icons/Group_1000002832.svg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/66fa24db9e2fc9c2913df3c9_Group%201000002823.svg', dest: 'images/icons/Group_1000002823.svg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/670ec26a0239cfd992fea388_Favicon%20(1).jpg', dest: 'images/favicon.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/670ec26e4047e968ae95a8bc_Favicon%20(2).jpg', dest: 'images/favicon2.jpg'},
  ];

  // Artist/Band/Chef images
  const artistImages = [
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/685af528986c972c28fde3d3_774A2061_(2)_OK.jpeg', dest: 'images/artists/Adassiya_live.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/685af365936ab16b5b2c43a9_7U0A6008.jpg', dest: 'images/artists/Diass.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/681623b0d5b98a2a4215f250_0e7a6710.jpeg', dest: 'images/artists/CJ_JEFF.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/67d1c7ee5d6373ba70a1c403_Ravens%202.jpg', dest: 'images/artists/Ravens_2.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671a10278555a7fdc959a3ff_67191044904880ff677ce976_25_1_11zon.webp', dest: 'images/artists/Kalamo.webp'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/69ef71d224fa3f91c86dd612_Arty%20photo%201%20BW.jpg', dest: 'images/artists/NADIA_BOULIF.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671f4a9e08913e8b7bfe5207_Katya%20Website.jpeg', dest: 'images/artists/Katya_Website.jpeg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671a13959d5967858523d64b_6718f5fe18003ff82a2868dc_IMG_3841.jpg', dest: 'images/artists/Komoya.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/6706a0beef76dca35a15e36b_Rectangle%20515%20(1).webp', dest: 'images/artists/Lumijay.webp'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/697a10ed3912691dac19ba92_Website%20Image.jpg', dest: 'images/artists/LUCIA_KOSTA.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671a1040161645016fc101e2_6718ffcfb0eafbb3c14b3025_Nikolina_1_11zon.webp', dest: 'images/artists/Nikolina.webp'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/673b3b2ff5790ba0d2288041_IMG_2255.JPG', dest: 'images/artists/Veronika_Fleyta.JPG'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/67190806cc23b8ff72c02b2b_IMG_0146.JPG', dest: 'images/artists/Regina_Lyu.JPG'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/6706b9b6e6b75bb329a53538_Urmet6%201%20(1).webp', dest: 'images/artists/Urmet_K.webp'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671f84cf53860aa6ec17b8f7_Maia%20Lee.png', dest: 'images/artists/Maia_Lee.png'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/671f899129bc3223210a5d4f_Sila%20Deren%20Photo.jpg', dest: 'images/artists/SILA_DEREN.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/672121a29a1111086c47f647_DANIEL_H_Res-16.jpg', dest: 'images/artists/Daniel_Sehnawi.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/672b5056c4dc2b8b57ffe401_3H5A0086_BW%20(1).jpg', dest: 'images/artists/KXD.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/691cbc4f28501575554dc1a3_9R3A1295.jpg', dest: 'images/bands/NANDRA.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/67ab58f126245a2760379bf2_24-11-2024-11-52-35.jpg', dest: 'images/bands/Nysiades.jpg'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5f3a/67083fb277b10ef03705bde8_424591114_18415534597056897_9019767500613232937_n.webp', dest: 'images/chefs/Bojana_Katsarova.webp'},
  ];

  // Lottie animations
  const lottieFiles = [
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/6710dfe80ae7715edc26c665_data-VM0qg.json', dest: 'lottie/data-VM0qg.json'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/6710b45e0236519d9d09e080_extraordinary%20(%20separate%20mask%20).json', dest: 'lottie/extraordinary.json'},
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/670f974b0ee19b1f63072e73_new%20iconic%20correction.json', dest: 'lottie/new_iconic_correction.json'},
  ];

  // CSS
  const cssFiles = [
    {url: 'https://cdn.prod.website-files.com/66ed5184dfba72ccfacb5ec7/css/avanguard-uprock-studio.webflow.shared.46f0676a2.css', dest: 'css/avanguard-uprock-studio.css'},
  ];

  console.log('Starting downloads...');
  console.log('Total files:', images.length + artistImages.length + lottieFiles.length + cssFiles.length);

  // Download all images
  for (const item of [...images, ...artistImages, ...lottieFiles, ...cssFiles]) {
    try {
      await download(item.url, item.dest);
    } catch (err) {
      console.error(`Failed to download ${item.dest}: ${err.message}`);
    }
  }

  console.log('Downloads complete!');
}

main();
