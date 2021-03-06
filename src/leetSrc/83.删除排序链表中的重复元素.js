/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/description/
 *
 * algorithms
 * Easy (48.23%)
 * Likes:    222
 * Dislikes: 0
 * Total Accepted:    55.5K
 * Total Submissions: 115K
 * Testcase Example:  '[1,1,2]'
 *
 * 给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。
 * 
 * 示例 1:
 * 
 * 输入: 1->1->2
 * 输出: 1->2
 * 
 * 
 * 示例 2:
 * 
 * 输入: 1->1->2->3->3
 * 输出: 1->2->3
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
var deleteDuplicates = function (head) {
    let res = head;
    let val = null;
    let prev = null;

    while (head) {
        let cur = head.val;
        if (val !== undefined && cur === val) {
            let temp = head.next;
            head.next = null;
            prev.next = temp;
            head = prev;
        }
        prev = head;
        head = head.next;
        val = cur;
    }
    return res;
};
// @lc code=end

