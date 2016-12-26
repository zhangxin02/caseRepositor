/**
 * Created by leson on 2016/8/2.
 */
function findNext(obj) {
    if (obj.nextElementSibling) {
        return obj.nextElementSibling
    } else {
        return obj.nextSibling;
    }
}
function findPre(obj) {
    if (obj.previousElementSibling) {
        return obj.previousElementSibling
    } else {
        return obj.previousSibling;
    }
}