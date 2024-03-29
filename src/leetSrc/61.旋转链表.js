/*
 * @lc app=leetcode.cn id=61 lang=javascript
 *
 * [61] 旋转链表
 *
 * https://leetcode-cn.com/problems/rotate-list/description/
 *
 * algorithms
 * Medium (39.40%)
 * Likes:    172
 * Dislikes: 0
 * Total Accepted:    32.5K
 * Total Submissions: 82.5K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，旋转链表，将链表每个节点向右移动 k 个位置，其中 k 是非负数。
 * 
 * 示例 1:
 * 
 * 输入: 1->2->3->4->5->NULL, k = 2
 * 输出: 4->5->1->2->3->NULL
 * 解释:
 * 向右旋转 1 步: 5->1->2->3->4->NULL
 * 向右旋转 2 步: 4->5->1->2->3->NULL
 * 
 * 
 * 示例 2:
 * 
 * 输入: 0->1->2->NULL, k = 4
 * 输出: 2->0->1->NULL
 * 解释:
 * 向右旋转 1 步: 2->0->1->NULL
 * 向右旋转 2 步: 1->2->0->NULL
 * 向右旋转 3 步: 0->1->2->NULL
 * 向右旋转 4 步: 2->0->1->NULL
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
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function (head, k) {
    // let start = null;
    // let res = [];
    // while (head) {
    //     res.push(head);
    //     head = head.next;
    // }
    // let len = res.length;
    // let w = k % len;
    // if (w !== 0) {
    //     start = res[len - w];
    //     res[len - w - 1] && (res[len - w - 1] = null);
    //     res[len - 1].next = res[0];
    // }
    // return start;
    let target = head, last = null, len = 1
    while (target && target.next) {
        target = target.next
        len++
    }
    last = target
    target = head
    if (k % len === 0) {
        return head
    }
    let diff = len - (k % len)
    let pre = null
    while (target && diff--) {
        pre = target
        target = target.next
    }
    pre.next = null
    last.next = head
    return target
};
// @lc code=end

