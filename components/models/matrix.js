class Matrix {
    m

    constructor(matrix) {
        this.m = matrix
    }

    get rowsNum() {
        return this.m.length
    }

    get colsNum() {
        return this.m[0].length
    }

    //回调函数返回行列号和元素
    each(cb) {
        for (let j = 0; j < this.colsNum; j++) {
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element,i,j)
            }
        }
    }

    transpose(){
        const desArr = []
        for (let j=0;j<this.colsNum;j++){
            desArr[j] = []
            for (let i =0;i<this.rowsNum;i++){
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }
}

export {
    Matrix
}