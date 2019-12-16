function StatistikKarakter(str) {
  let result = {
    kapital: 0,
    nonKapital: 0,
    angka: 0,
    vokal: 0,
    konsonan: 0
  };

  const vokal = "aiueo";
  const konsonan = "bcdfghjklmnpqrstvwxyz";

  for (let i = 0; i < str.length; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 48 && charCode <= 57) result.angka++;
    if (charCode >= 65 && charCode <= 90) result.kapital++;
    if (charCode >= 97 && charCode <= 122) result.nonKapital++;
    if (vokal.indexOf(str[i].toLowerCase()) !== -1) result.vokal++;
    if (konsonan.indexOf(str[i].toLowerCase()) !== -1) result.konsonan++;
  }

  console.log(
    result.kapital,
    result.nonKapital,
    result.angka,
    result.vokal,
    result.konsonan
  );
  return result;
}

StatistikKarakter("%%%PPPabcdefghijklmnopqrstuvwxyzAEIOU123410");
// StatistikKarakter(
// 	"Welcome to the online text analysis tool, the detailed statistics of your text, perfect for translators (quoting), for webmasters (ranking) or for normal users, to know the subject of a text. Now with new features as the analysis of words groups, finding out the keyword density, analyse the prominence of word or expressions. Webmasters can analyse the links on their pages. More instructions are about to be written, please send us your feedback !"
// );
