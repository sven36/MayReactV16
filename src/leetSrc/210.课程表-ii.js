/*
 * @lc app=leetcode.cn id=210 lang=javascript
 *
 * [210] 课程表 II
 *
 * https://leetcode-cn.com/problems/course-schedule-ii/description/
 *
 * algorithms
 * Medium (47.46%)
 * Likes:    99
 * Dislikes: 0
 * Total Accepted:    14.4K
 * Total Submissions: 30.9K
 * Testcase Example:  '2\n[[1,0]]'
 *
 * 现在你总共有 n 门课需要选，记为 0 到 n-1。
 * 
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们: [0,1]
 * 
 * 给定课程总量以及它们的先决条件，返回你为了学完所有课程所安排的学习顺序。
 * 
 * 可能会有多个正确的顺序，你只要返回一种就可以了。如果不可能完成所有课程，返回一个空数组。
 * 
 * 示例 1:
 * 
 * 输入: 2, [[1,0]] 
 * 输出: [0,1]
 * 解释: 总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。
 * 
 * 示例 2:
 * 
 * 输入: 4, [[1,0],[2,0],[3,1],[3,2]]
 * 输出: [0,1,2,3] or [0,2,1,3]
 * 解释: 总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
 * 因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。
 * 
 * 
 * 说明:
 * 
 * 
 * 输入的先决条件是由边缘列表表示的图形，而不是邻接矩阵。详情请参见图的表示法。
 * 你可以假定输入的先决条件中没有重复的边。
 * 
 * 
 * 提示:
 * 
 * 
 * 这个问题相当于查找一个循环是否存在于有向图中。如果存在循环，则不存在拓扑排序，因此不可能选取所有课程进行学习。
 * 通过 DFS 进行拓扑排序 - 一个关于Coursera的精彩视频教程（21分钟），介绍拓扑排序的基本概念。
 * 
 * 拓扑排序也可以通过 BFS 完成。
 * 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
    let inDegree = new Array(numCourses).fill(0), res = [], adj = new Array(numCourses),
        temp = [];
    // initialize adj
    for (let i = 0; i < numCourses; i++) {
        adj[i] = [];
    }
    for (let i = 0; i < prerequisites.length; i++) {
        adj[prerequisites[i][1]].push(prerequisites[i][0]);
        inDegree[prerequisites[i][0]] += 1;
    }
    for (let i = 0; i < numCourses; i++) {
        if (inDegree[i] === 0) {
            temp.push(i);
        }
    }
    while (temp.length > 0) {
        let top = temp.shift();
        res.push(top);
        for (let i = 0; i < adj[top].length; i++) {
            inDegree[adj[top][i]]--;
            if (inDegree[adj[top][i]] === 0) {
                temp.push(adj[top][i]);
            }
        }
    }
    return res.length === numCourses ? res : [];
};
findOrder(7, [[1, 3], [1, 4], [2, 4], [3, 5], [3, 6], [4, 6]])

// @lc code=end

