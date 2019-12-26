/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 *
 * https://leetcode-cn.com/problems/merge-two-sorted-lists/description/
 *
 * algorithms
 * Easy (58.25%)
 * Likes:    708
 * Dislikes: 0
 * Total Accepted:    139.1K
 * Total Submissions: 238.7K
 * Testcase Example:  '[1,2,4]\n[1,3,4]'
 *
 * 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例：
 * 
 * 输入：1->2->4, 1->3->4
 * 输出：1->1->2->3->4->4
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    let fakeNode = new ListNode(-1);
    let start = fakeNode;
    while (l1 || l2) {
        if (l1 && l2) {
            if (l1.val >= l2.val) {
                fakeNode.next = l2;
                l2 = l2.next;
                fakeNode = fakeNode.next;
                continue;
            } else {
                fakeNode.next = l1;
                l1 = l1.next;
                fakeNode = fakeNode.next;
                continue;
            }
        }
        if (l1) {
            fakeNode.next = l1;
            l1 = l1.next;
            fakeNode = fakeNode.next;
            continue;
        }
        if (l2) {
            fakeNode.next = l2;
            l2 = l2.next;
            fakeNode = fakeNode.next;
            continue;
        }
    }

    return start.next;
};
// mergeTwoLists({ val: 1, next: { val: 2, next: null } }, { val: 1, next: { val: 3, next: null } })
// @lc code=end

