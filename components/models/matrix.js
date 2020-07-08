/**
 * @author Peter
 * @date 2020/7/8
 * @Description: 矩阵用于创建能用于购物车SKU的数据结构
*/

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