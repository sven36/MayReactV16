/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
 *
 * https://leetcode-cn.com/problems/reverse-linked-list-ii/description/
 *
 * algorithms
 * Medium (47.89%)
 * Likes:    243
 * Dislikes: 0
 * Total Accepted:    25.1K
 * Total Submissions: 52.5K
 * Testcase Example:  '[1,2,3,4,5]\n2\n4'
 *
 * 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。
 * 
 * 说明:
 * 1 ≤ m ≤ n ≤ 链表长度。
 * 
 * 示例:
 * 
 * 输入: 1->2->3->4->5->NULL, m = 2, n = 4
 * 输出: 1->4->3->2->5->NULL
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
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function (head, m, n) {
    let i = j = 0;
    let node = head;
    while (node) {
        i++;
        if (i === m - 1) {
            node = reverseNode(node);
            break;
        }
        node = node.next;
    }
    function reverseNode(node) {
        j++;
        if (node === null || j === (n - m + 2)) {
            return node;
        }
        let res = reverseNode(node.next);
        let temp = res.next;
        res.next = node;
        node.next = temp;
        return res;
    }
    return head
};
let l5 = {
    val: 5,
    next: null
}
let l4 = {
    val: 4,
    next: l5
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
reverseBetween(l1, 2, 4);
// @lc code=end

