interface AddDaysProps {
  days: number; //총일수
  firstDay: number; //첫째날
  arr: Array<number | null>; //배열
}
export const addDays = ({ days, firstDay, arr }: AddDaysProps) => {
  const sum = days + firstDay;
  let i = 0;

  for (i = 0; i < sum; i++) {
    if (i < firstDay) {
      arr.push(null);
    } else {
      arr.push(i - firstDay + 1);
    }
  }
  const addLastDay = 42 - arr.length;

  for (i = 0; i < addLastDay; i++) {
    arr.push(null);
  }

  return arr;
};
