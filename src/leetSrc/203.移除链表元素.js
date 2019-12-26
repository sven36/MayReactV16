/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
 *
 * https://leetcode-cn.com/problems/remove-linked-list-elements/description/
 *
 * algorithms
 * Easy (42.82%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    46.2K
 * Total Submissions: 107.9K
 * Testcase Example:  '[1,2,6,3,4,5,6]\n6'
 *
 * 删除链表中等于给定值 val 的所有节点。
 * 
 * 示例:
 * 
 * 输入: 1->2->6->3->4->5->6, val = 6
 * 输出: 1->2->3->4->5
 * 
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
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function (node, val) {
    let start = new ListNode(null);
    start.next = node;
    let l = start;
    while (start.next) {
        if (start.next.val === val) {
            start.next = start.next.next;
            continue;
        }
        start = start.next;
    }
    return l.next;
};
// let s = { val: 1, next: { val: 1, next: null } };
// removeElements(s, 1);
// @lc code=end

