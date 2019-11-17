/*
 * @lc app=leetcode.cn id=86 lang=javascript
 *
 * [86] 分隔链表
 *
 * https://leetcode-cn.com/problems/partition-list/description/
 *
 * algorithms
 * Medium (53.63%)
 * Likes:    131
 * Dislikes: 0
 * Total Accepted:    18.5K
 * Total Submissions: 34.6K
 * Testcase Example:  '[1,4,3,2,5,2]\n3'
 *
 * 给定一个链表和一个特定值 x，对链表进行分隔，使得所有小于 x 的节点都在大于或等于 x 的节点之前。
 * 
 * 你应当保留两个分区中每个节点的初始相对位置。
 * 
 * 示例:
 * 
 * 输入: head = 1->4->3->2->5->2, x = 3
 * 输出: 1->2->2->4->3->5
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
 * @param {number} x
 * @return {ListNode}
 */
var partition = function (head, x) {
    let start = new ListNode(-1);
    let end = new ListNode(-1);
    let r = end;
    let s = start;
    while (head) {
        let val = head.val;
        if (val < x) {
            start.next = head;
            start = start.next;
        } else {
            end.next = head;
            end = end.next;
        }
        head = head.next;
    }
    end.next = null;
    start.next = r.next;
    return s.next;
    // var before = new ListNode(-1);
    // var beforeNode = before;
    // var after = new ListNode(-1);
    // var afterNode = after;
    // while (head) {
    //     if (head.val < x) {
    //         before.next = head;
    //         before = before.next;
    //     } else {
    //         after.next = head;
    //         after = after.next;
    //     }
    //     head = head.next;
    // }
    // after.next = null;
    // before.next = afterNode.next;
    // return beforeNode.next;

};
// @lc code=end

