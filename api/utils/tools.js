module.exports = {
    checkDataUserCreate(user) {
        const check = {
            status: null,
            error: null
        }
        if (user.name.length < 2) {
            check.status = false
            check.error = "Name to short!";
            return check
        }
        if (user.name.length > 6) {
            check.status = false
            check.error = "Name is too long, must be no more than 6 characters";
            return check
        }
        if (user.name.search(/\d/) !== -1) {
            check.status = false
            check.error = "there can be no numbers in the name";
            return check
        }
        if (user.password.length < 4) {
            check.status = false
            check.error = "Password to short!";
            return check
        }
        if (!/\d/i.test(user.password) || !/[a-zа-яё]/i.test(user.password)) {
            check.status = false
            check.error = "The password is too simple, it must consist of numbers and letters";
            return check
        }

        check.status = true;
        check.error = ""
        return check
    },

    pagination (query, count) {

        const number = query === "/" ?  0 : Number(query.split("=").pop())

        let m = count % 10 ?  Math.floor(count / 10) : Math.floor(count / 10) - 1
        let current = number,
            last = m,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [],
            rangeWithDots = [],
            l;

        if (current > 0 ) rangeWithDots.push(0)

        for (let i = 1; i <= last; i++) {
            if (i === 1 || i === last || i >= left && i < right) {
                range.push(i);
            }
        }

        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1);
                } else if (i - l !== 1) {
                    rangeWithDots.push('...');
                }
            }
            rangeWithDots.push(i);
            l = i;
        }

        let pagin = '';

        for (let i = 0; i < rangeWithDots.length; i++) {
            if (rangeWithDots[i] === '...') {
                pagin += `<li >
                          <span>
                              ...
                          </span>
                      </li>`

            } else {
                if (rangeWithDots[i] === number) {
                    pagin += `<li >\n` +
                        `                  <a href="/?search=${rangeWithDots[i]}">\n` +
                        `                  ${rangeWithDots[i]} </a>\n </li>`
                } else {
                    pagin += `<li >\n` +
                        `                  <a  href="/?search=${rangeWithDots[i]}">\n` +
                        `                  ${rangeWithDots[i]} </a>\n </li>`
                }
            }
        }

        return {multiplyNumber: number, pagination: pagin }

    }
}