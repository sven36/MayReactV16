/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
 *
 * https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/description/
 *
 * algorithms
 * Medium (36.38%)
 * Likes:    584
 * Dislikes: 0
 * Total Accepted:    91.9K
 * Total Submissions: 252.6K
 * Testcase Example:  '[1,2,3,4,5]\n2'
 *
 * 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。
 * 
 * 示例：
 * 
 * 给定一个链表: 1->2->3->4->5, 和 n = 2.
 * 
 * 当删除了倒数第二个节点后，链表变为 1->2->3->5.
 * 
 * 
 * 说明：
 * 
 * 给定的 n 保证是有效的。
 * 
 * 进阶：
 * 
 * 你能尝试使用一趟扫描实现吗？
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    function ListNode(val) {
        this.val = val;
        this.next = null;
    }
    let slow = null;
    let i = 0;
    let fast = new ListNode(-1);
    let init = fast;
    fast.next = head;
    while (fast) {
        fast = fast.next;
        i++;
        if (i >= n + 1) {
            if (!slow) {
                slow = init;
            } else {
                slow = slow.next;
            }
        }
    }
    slow.next = slow.next.next;
    return init.next;
};
// removeNthFromEnd({ val: 1, next: { val: 2, next: null } }, 2)
// @lc code=end

