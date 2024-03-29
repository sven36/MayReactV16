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
    // return if only 1 or 2 node in the list
    if (head === null || head.next === null) return;

    //O(n)
    // use p1 & p2 find the middle node of the linked list
    let p1 = head,
        p2 = head;
    // split list to two parts. e.g. 123,45 or 12,34;    
    while (p1.next && p2.next && p2.next.next) {
        p1 = p1.next;
        p2 = p2.next.next;
    }
    p2 = p1.next;
    p1.next = null;
    p1 = head;

    //O(n)
    // revert p2
    let curr = p2,
        pre = null;
    while (curr !== null) {
        let tmp = curr.next;
        curr.next = pre;
        pre = curr;
        curr = tmp
    }
    // set p2 head
    p2 = pre;

    //O(n)
    // combine p1 & p2;
    while (p2 !== null) {
        let next1 = p1.next,
            next2 = p2.next;
        p1.next = p2;
        p2.next = next1;
        p1 = next1;
        p2 = next2;
    }
};
// let l5 = {
//     val: 5,
//     next: null
// }
// let l4 = {
//     val: 4,
//     next: null
// }
// let l3 = {
//     val: 3,
//     next: l4
// }
// let l2 = {
//     val: 2,
//     next: l3
// }
// let l1 = {
//     val: 1,
//     next: l2
// }
// reorderList(l1);
// @lc code=end

