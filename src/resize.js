export const setOnresize = (that) => {

    let width = document.documentElement.offsetWidth || document.body.offsetWidth
    if (width < 768 ) {
        that.isPhone = true
        that.$store.state.isPhoneG = that.isPhone
    }

    window.onresize = () => {
        if (document.documentElement.offsetWidth < 768 || document.body.offsetWidth < 768) {
            that.isPhone = true
            that.$store.state.isPhoneG = that.isPhone
        } else {
            that.isPhone = false
            that.$store.state.isPhoneG = that.isPhone
        }
    }

    if (
        navigator.userAgent.indexOf("Edge") > 0 ||
        navigator.userAgent.indexOf("LBBROWSER") > 0 ||
        navigator.userAgent.indexOf("msie") > 0
    ) { console.log('cut') } 
    else {
        that.$store.state.isShowList = true
        window.addEventListener('scroll', () => {
            if (document.querySelector('body').scrollTop) {
                if (that.$store.state.h.length <= 1) {
                    // ...
                } else if (that.$store.state.h.length === 2) {
                    if (that.$store.state.witch !== 1) {
                        if (document.querySelector('body').scrollTop - 50 > that.$store.state.h[1][1]) {
                            that.$store.state.witch += 1
                        }
                    }
                    if (that.$store.state.witch !== 0) {
                        if (document.querySelector('body').scrollTop - 50 < that.$store.state.h[1][1]) {
                            that.$store.state.witch -= 1
                        }
                    }
                } else {
                    if (that.$store.state.witch === 0) {
                        if (document.querySelector('body').scrollTop > that.$store.state.h[that.$store.state.witch + 1][1]) {
                            that.$store.state.witch += 1
                        }
                    } else if (that.$store.state.witch === that.$store.state.h.length - 1) {
                        if (document.querySelector('body').scrollTop < that.$store.state.h[that.$store.state.witch][1]) {
                            that.$store.state.witch -= 1
                        }
                    } else {
                        if (document.querySelector('body').scrollTop > that.$store.state.h[that.$store.state.witch + 1][1]) {
                            that.$store.state.witch += 1
                        } else if (document.querySelector('body').scrollTop < that.$store.state.h[that.$store.state.witch][1]) {
                            that.$store.state.witch -= 1
                        }
                    }
                }
            }
        } , true)
    }
}