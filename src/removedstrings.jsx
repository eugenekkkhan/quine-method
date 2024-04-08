function Owns(A, B) {
    for (let i = 0; i < A.length; i++) {
      if (A[i] !== B[i] && A[i] !== 2 && B[i] !== 2) {
        return false;
      }
    }
    return true;
  }

  function Weight(a) {
    let k = 0;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== 2) {
        k++;
      }
    }
    return k;
  }

  function Gluing(a, b) {
    let result = '';
    let found = -1;
    let kol = 0, i = 0;
    while ((kol < 2) && (i < a.length)) {
      if ((a[i] !== b[i])) {
        kol++;
        found = i;
      }
      i++;
    }
    if (kol === 1) {
      result = a;
      result[found] = 2;
    }
    return result;
  }
  
  function Absorption(a, b) {
    let result = [];
    let found = -1;
    let amount = 0, i = 0;
    while ((amount < 2) && (i < a.length)) {
      if (((a[i] == 2) && (b[i] != 2)) || ((b[i] == 2) && (a[i] != 2))) {
        amount++;
        found = i;
      } else if ((a[i] != 2) && (b[i] != 2) && (a[i] != b[i])) {
        return result;
      }
      i++;
    }
    if (amount === 1) {
      result = a;
      result[found] = 2;
    }
    return result;
  }
  
  // [[[1,0,0], false], [[1,0,0], false]]
  function Abbreviate(data, function_) {
    while (true) {
      let h = [];
      let flag = false;
      for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
          if (i != j) {
            let buf = function_(data[i][0], data[j][0]);
            if (buf != []) {
              data[i][1] = true;
              data[j][1] = true;
              flag = true;
              let object = [buf, false];
              let X3 = false;
              for (let x of h) {
                if (x[0] === object[0]) {
                  X3 = true;
                  break;
                }
              }
              if (!X3) {
                h.push(object);
              }
            }
          }
        }
        if (!data[i][1]) {
          let X3 = false;
          for (let x of h) {
            if (x[0] === data[i][0]) {
              X3 = true;
              break;
            }
          }
          if (!X3) {
            h.push([data[i][0], data[i][1]]);
          }
        }
      }
      if (!flag) {
        break;
      }
      data = h;
    }
    return data;
  }

  function Abbreviated_dnf(data)
  {
    data = Abbreviate(data, Gluing);
    data = Abbreviate(data, Absorption);
    return data;
  }

  