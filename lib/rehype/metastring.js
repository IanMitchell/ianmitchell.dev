// import visit from 'unist-util-visit';

// export function metastring() {
//   return (tree) =>
//     visit(tree, 'element', (node) => {
//       if (node.tagName === 'code' && node.data && node.data.meta) {
//         node.properties.meta = node.data.meta;
//       }
//     });
// }

const visit = require('unist-util-visit');

module.exports = function () {
  return (tree) =>
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data && node.data.meta) {
        console.log(node.data.meta);
        node.properties.metastring = node.data.meta;
      }
    });
};
