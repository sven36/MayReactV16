/*
 * @lc app=leetcode.cn id=148 lang=javascript
 *
 * [148] 排序链表
 *
 * https://leetcode-cn.com/problems/sort-list/description/
 *
 * algorithms
 * Medium (62.44%)
 * Likes:    320
 * Dislikes: 0
 * Total Accepted:    29.7K
 * Total Submissions: 47.6K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序。
 * 
 * 示例 1:
 * 
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 * 
 * 
 * 示例 2:
 * 
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
 * @return {ListNode}
 */
var sortList = function (head) {
    if (!head || !head.next)
        return head;
    let slow = head,
        fast = head;
    while (slow.next && fast.next && fast.next.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let mid = slow.next;
    slow.next = null;
    let right = mid;
    let left = head;
    return merge(sortList(left), sortList(right));
};
let merge = function (left, right) {
    let res = new ListNode(null);
    let p1 = left,
        p2 = right;
    let p = res;
    while (p1 && p2) {
        if (p1.val < p2.val) {
            let s = p1;
            p1 = p1.next;
            s.next = null;
            p.next = s;
            p = s;
        } else {
            let s = p2;
            p2 = p2.next;
            s.next = null;
            p.next = s;
            p = s;
        }
    }
    if (p1)
        p.next = p1;
    if (p2)
        p.next = p2;
    return res.next;
}
// @lc code=end

