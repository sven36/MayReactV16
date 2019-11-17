/*
 * @lc app=leetcode.cn id=82 lang=javascript
 *
 * [82] 删除排序链表中的重复元素 II
 *
 * https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list-ii/description/
 *
 * algorithms
 * Medium (44.42%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    23.7K
 * Total Submissions: 53.3K
 * Testcase Example:  '[1,2,3,3,4,4,5]'
 *
 * 给定一个排序链表，删除所有含有重复数字的节点，只保留原始链表中 没有重复出现 的数字。
 * 
 * 示例 1:
 * 
 * 输入: 1->2->3->3->4->4->5
 * 输出: 1->2->5
 * 
 * 
 * 示例 2:
 * 
 * 输入: 1->1->1->2->3
 * 输出: 2->3
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
    // let st = head;
    // let res = [];
    // while (head) {
    //     let cur = head.val;
    //     let p = res[1] || res[0] || {};
    //     if (p.val !== undefined && cur === p.val) {
    //         let temp = head.next;
    //         head.next = null;
    //         res[0].next = temp;
    //         head = res[0];
    //     }

    //     if (res.length < 2) {
    //         res.push(head);
    //     } else {
    //         res.shift();
    //     }
    //     head = head.next;
    // }
    // return st;
    let fake = new ListNode();
    fake.next = head; // 插入了一个虚拟的头结点以便操作
    if (!fake.next) return fake.next; // 检查链表是否为空
    let p = fake, f = p.next, b = f.next, flag = false;
    while (f && b) {
        if (f.val != b.val) { // 若前向指针f和后向指针b的值不同
            if (!flag) { // 若之前未发生相同数值的情况
                p = f; // 重置p指针
            } else {
                p.next = b; // 否则把p到b中的所有元素删除
            }
            flag = false; // 清空标志
        } else {
            flag = true; // 发生了值相同的情况
        }
        f = b;
        b = b.next; // 前后指针向后移动一格
    };
    if (flag) p.next = b; // 收尾处理一下
    return fake.next;

};
// @lc code=end

