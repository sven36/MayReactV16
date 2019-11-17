/*
 * @lc app=leetcode.cn id=143 lang=javascript
 *
 * [143] 重排链表
 *
 * https://leetcode-cn.com/problems/reorder-list/description/
 *
 * algorithms
 * Medium (52.74%)
 * Likes:    127
 * Dislikes: 0
 * Total Accepted:    11.2K
 * Total Submissions: 21.3K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 给定一个单链表 L：L0→L1→…→Ln-1→Ln ，
 * 将其重新排列后变为： L0→Ln→L1→Ln-1→L2→Ln-2→…
 * 
 * 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。
 * 
 * 示例 1:
 * 
 * 给定链表 1->2->3->4, 重新排列为 1->4->2->3.
 * 
 * 示例 2:
 * 
 * 给定链表 1->2->3->4->5, 重新排列为 1->5->2->4->3.
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
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
    let arr = [];
    while (head) {
        arr.push(head);
        head = head.next;
    }
    let len = arr.length;
    for (let i = 0; i < len; i += 2) {
        let l = arr[i];
        let n = arr[i + 1] || null;
        let r = arr[len - i - 1];
        l.next = r;
        r.next = n;
    }
    return arr[0];
};
// let l5 = {
//     val: 5,
//     next: null
// }
let l4 = {
    val: 4,
    next: null
}
let l3 = {
    val: 3,
    next: l4
}
let l2 = {
    val: 2,
    next: l3
}
let l1 = {
    val: 1,
    next: l2
}
reorderList(l1);
// @lc code=end

