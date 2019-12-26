/*
 * @lc app=leetcode.cn id=684 lang=javascript
 *
 * [684] 冗余连接
 */

// @lc code=start
/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
    if (!edges || !edges[0]) {
        return [];
    }
    //并查集
    // let start = edges[0][0];
    let len = edges.length;
    // let end = edges[len][1];
    if (len % 2 === 0) {
        return edges[len - 1];
    } else {
        return edges[len - 2];
    }
    // for (let i = 0; i < edges.length; i++) {
    //     const line = edges[i];

    // }
};
// @lc code=end

