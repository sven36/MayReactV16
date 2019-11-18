/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 *
 * https://leetcode-cn.com/problems/add-two-numbers/description/
 *
 * algorithms
 * Medium (36.02%)
 * Likes:    3415
 * Dislikes: 0
 * Total Accepted:    256.8K
 * Total Submissions: 713K
 * Testcase Example:  '[2,4,3]\n[5,6,4]'
 *
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 
 * 示例：
 * 
 * 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
 * 输出：7 -> 0 -> 8
 * 原因：342 + 465 = 807
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
    if (!l1 || !l2) {
        return;
    }
    let res = new ListNode(0);
    let root = res;
    let isAdd = 0;
    while (l1 || l2 || isAdd) {
        let l1Val = 0;
        if (l1) {
            l1Val = l1.val;
            l1 = l1.next;
        }
        let l2Val = 0;
        if (l2) {
            l2Val = l2.val;
            l2 = l2.next;
        }
        let allVal = l1Val + l2Val + isAdd;
        if (allVal > 9) {
            isAdd = 1;
        } else {
            isAdd = 0;
        }
        res.next = new ListNode(allVal % 10);
        res = res.next;
    }

    return root.next;
};
// @lc code=end


// Josephus Problem
function problem(nums, k) {
    function ListNode(num) {
        this.val = num;
        this.next = null;
    }
    let s = new ListNode(nums[0]);
    let r = s;
    for (let i = 1; i < nums.length; i++) {
        s.next = new ListNode(nums[i]);
        s = s.next;
    }
    let n = 0;
    let prev = null;
    while (r) {
        n++;

        if (n % k === 0) {
            
        }
        prev = r;
        r = r.next;
    }
}

