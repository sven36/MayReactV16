/*
 * @lc app=leetcode.cn id=328 lang=javascript
 *
 * [328] 奇偶链表
 *
 * https://leetcode-cn.com/problems/odd-even-linked-list/description/
 *
 * algorithms
 * Medium (59.87%)
 * Likes:    104
 * Dislikes: 0
 * Total Accepted:    19.9K
 * Total Submissions: 33.2K
 * Testcase Example:  '[1,2,3,4,5]'
 *
 * 给定一个单链表，把所有的奇数节点和偶数节点分别排在一起。请注意，这里的奇数节点和偶数节点指的是节点编号的奇偶性，而不是节点的值的奇偶性。
 * 
 * 请尝试使用原地算法完成。你的算法的空间复杂度应为 O(1)，时间复杂度应为 O(nodes)，nodes 为节点总数。
 * 
 * 示例 1:
 * 
 * 输入: 1->2->3->4->5->NULL
 * 输出: 1->3->5->2->4->NULL
 * 
 * 
 * 示例 2:
 * 
 * 输入: 2->1->3->5->6->4->7->NULL 
 * 输出: 2->3->6->7->1->5->4->NULL
 * 
 * 说明:
 * 
 * 
 * 应当保持奇数节点和偶数节点的相对顺序。
 * 链表的第一个节点视为奇数节点，第二个节点视为偶数节点，以此类推。
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
 * @return {ListNode}
 */
var oddEvenList = function (head) {
    // let s = head;
    // let l = head;
    // //上一个
    // let m = head;
    // let n = head;
    // let i = 0;
    // while (head && m) {
    //     i++;
    //     if (i > 1 && (i & 1)) {
    //         //奇数
    //         //节点下一个
    //         n = head.next;
    //         m.next = n;

    //         let temp = l.next;
    //         head.next = temp;
    //         l.next = head;

    //         l = l.next;
    //         head = m;
    //     }

    //     m = head;
    //     head = head.next;
    // }
    // return s;

    if (!head) {
        return null;
    }

    let odd = head;
    let even = head.next;
    let s = even;

    while (even && even.next) {

        odd.next = even.next;
        even.next = even.next.next;
        odd = odd.next;
        even = even.next;
    }
    odd.next = s;
    return head;
};
// let rs = { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } };
// oddEvenList(rs);
// @lc code=end

