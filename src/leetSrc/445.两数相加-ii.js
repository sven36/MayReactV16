/*
 * @lc app=leetcode.cn id=445 lang=javascript
 *
 * [445] 两数相加 II
 *
 * https://leetcode-cn.com/problems/add-two-numbers-ii/description/
 *
 * algorithms
 * Medium (51.83%)
 * Likes:    94
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 17.3K
 * Testcase Example:  '[7,2,4,3]\n[5,6,4]'
 *
 * 给定两个非空链表来代表两个非负整数。数字最高位位于链表开始位置。它们的每个节点只存储单个数字。将这两数相加会返回一个新的链表。
 * 
 * 
 * 
 * 你可以假设除了数字 0 之外，这两个数字都不会以零开头。
 * 
 * 进阶:
 * 
 * 如果输入链表不能修改该如何处理？换句话说，你不能对列表中的节点进行翻转。
 * 
 * 示例:
 * 
 * 
 * 输入: (7 -> 2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出: 7 -> 8 -> 0 -> 7
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
var addTwoNumbers = function (l1, l2) {
    let stack1 = [];
    let stack2 = [];

    while (l1) {
        stack1.push(l1);
        l1 = l1.next;
    };

    while (l2) {
        stack2.push(l2);
        l2 = l2.next;
    }

    let dummyHead = { next: null };
    let carry = 0;

    while (stack1.length || stack2.length) {
        let p1 = stack1.pop();
        let p2 = stack2.pop();

        let x = p1 ? p1.val : 0;
        let y = p2 ? p2.val : 0;

        let sum = x + y + carry;
        let b = sum % 10;              //个位
        let a = Math.floor(sum / 10); //十位
        //直接把新来的节点插入首位
        dummyHead.next = { val: b, next: dummyHead.next };
        carry = a;
    };

    if (carry) {
        dummyHead.next = { val: carry, next: dummyHead.next };
    };
    return dummyHead.next;
};
// @lc code=end

