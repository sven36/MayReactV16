/*
 * @lc app=leetcode.cn id=147 lang=javascript
 *
 * [147] 对链表进行插入排序
 *
 * https://leetcode-cn.com/problems/insertion-sort-list/description/
 *
 * algorithms
 * Medium (61.19%)
 * Likes:    96
 * Dislikes: 0
 * Total Accepted:    14.3K
 * Total Submissions: 23.4K
 * Testcase Example:  '[4,2,1,3]'
 *
 * 对链表进行插入排序。
 * 
 * 
 * 插入排序的动画演示如上。从第一个元素开始，该链表可以被认为已经部分排序（用黑色表示）。
 * 每次迭代时，从输入数据中移除一个元素（用红色表示），并原地将其插入到已排好序的链表中。
 * 
 * 
 * 
 * 插入排序算法：
 * 
 * 
 * 插入排序是迭代的，每次只移动一个元素，直到所有元素可以形成一个有序的输出列表。
 * 每次迭代中，插入排序只从输入数据中移除一个待排序的元素，找到它在序列中适当的位置，并将其插入。
 * 重复直到所有输入数据插入完为止。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入: 4->2->1->3
 * 输出: 1->2->3->4
 * 
 * 
 * 示例 2：
 * 
 * 输入: -1->5->3->4->0
 * 输出: -1->0->3->4->5
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
var insertionSortList = function (head) {
    if (!head) return null;
    let node = {
        val: null,
        next: head,
    }
    while (head && head.next !== null) {
        // 当当前节点大于后面的节点的时候，需要进行处理
        if (head.val > head.next.val) {
            // 取出下一个节点
            let cur = head.next;
            head.next = cur.next;
            cur.next = null;
            // 取出节点放在从头开始比较节点的大小
            let nodeNext = node;
            let isAdd = false;
            while (nodeNext && nodeNext.next !== null) {
                // 当找到一个节点的下一个节点大于当前取出的节点的时候，插入
                if (nodeNext.next.val > cur.val) {
                    cur.next = nodeNext.next;
                    nodeNext.next = cur;
                    isAdd = true;
                    break;
                }
                nodeNext = nodeNext.next;
            }
            // 如果没有进循环，表示没有比自己更大的节点，因此直接插入在最后面
            if (!isAdd) {
                nodeNext.next = cur;
            }
        }
        // 这里需要判断是否交换到最后一个节点，若是最后一个是没有下一个的值的
        if (head.next && head.next.val >= head.val) {
            head = head.next;
        }
    }
    return node.next;
};
// @lc code=end

