/*
 * @lc app=leetcode.cn id=23 lang=javascript
 *
 * [23] 合并K个排序链表
 *
 * https://leetcode-cn.com/problems/merge-k-sorted-lists/description/
 *
 * algorithms
 * Hard (47.86%)
 * Likes:    390
 * Dislikes: 0
 * Total Accepted:    55.6K
 * Total Submissions: 116.1K
 * Testcase Example:  '[[1,4,5],[1,3,4],[2,6]]'
 *
 * 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。
 * 
 * 示例:
 * 
 * 输入:
 * [
 * 1->4->5,
 * 1->3->4,
 * 2->6
 * ]
 * 输出: 1->1->2->3->4->4->5->6
 * 
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (nodes) {
    if (nodes == null || nodes.length == 0) return null;
    //分治到最细粒度也就是两个链表合并，所以直接两两合并即可
    //一直两两合并，奇数时最后的1个不合并，扔到下一轮继续合并
    while (nodes.length != 1) {
        var temp = [];
        for (var i = 0, length = nodes.length - 1; i < length; i += 2) {
            //这里可以调用21题的方法了，注释我不写了，回去看21题
            var first = { 'val': -1 }, second = first;
            var node1 = nodes[i], node2 = nodes[i + 1];
            while (node1 != null && node2 != null) {
                if (node1.val <= node2.val) {
                    second.next = node1;
                    node1 = node1.next;
                } else {
                    second.next = node2;
                    node2 = node2.next;
                }
                second = second.next;
            }
            second.next = node1 == null ? node2 : node1;
            temp.push(first.next);
        }
        //如果是奇数，最后会多一个，丢进去继续处理
        if (nodes.length > temp.length * 2) {
            temp.push(nodes[nodes.length - 1]);
        }
        nodes = temp;
    }
    return nodes[0];

};
// @lc code=end

