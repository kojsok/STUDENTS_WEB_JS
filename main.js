// Этап 1. В HTML файле создайте верстку элементов, которые будут статичны(неизменны).

// Этап 2. Создайте массив объектов студентов.Добавьте в него объекты студентов, например 5 студентов.
(function () {
  const studentsList = [
    // Добавьте сюда объекты студентов
    {
      surName: "Петров",
      name: "Петя",
      middleName: "Петрович",
      birthDate: "1986-01-29",
      faculty: "Физкультура",
      studyStart: 2015
    },
    {
      surName: "Иванов",
      name: "Иван",
      middleName: "Иванович",
      birthDate: "1986-01-29",
      faculty: "Матмех",
      studyStart: 2020
    },
    {
      surName: "Сидоров",
      name: "Николай",
      middleName: "Иванович",
      birthDate: "1990-01-29",
      faculty: "Информатика",
      studyStart: 2015
    },
    {
      surName: "Абрамов",
      name: "Антон",
      middleName: "Анатольевич",
      birthDate: "1990-01-29",
      faculty: "Физкультура",
      studyStart: 2020
    },
    {
      surName: "Николаева",
      name: "Валентина",
      middleName: "Петровна",
      birthDate: "1990-01-29",
      faculty: "Физкультура",
      studyStart: 2020
    }
  ]


  // вычисление возраста, курса и форматирование времени
  function getStudentAge(birthDate) {
    //10.10.1983  YYYY-MM-DD – это дата: год-месяц-день. приходит вот так 	2008-12-29
    const now = new Date();
    let arrayOfStrings = birthDate.split("-"); //результат: ['2023','12', '29']
    const myDateYear = Number(arrayOfStrings[0]);
    const age = now.getFullYear() - myDateYear;
    return age;
  }

  //конвертируем формат даты 2008-12-29 в мм-дд-гггг
  function convertDateString(dateString) {
    const dateParts = dateString.split("-");
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
  }

  //вычисляем курс
  function formatStudentCourse(studyingDate) {
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth();
    if (nowMonth > 9 && Number(studyingDate) <= 2019) {
      return `${Number(studyingDate)} - ${Number(studyingDate) + 4} (Закончил)`;
    }
    return `${Number(studyingDate)} - ${nowDate.getFullYear()} (${2023 - Number(studyingDate) + 1} курс)`;
  }

  // Этап 3. Создайте функцию вывода одного студента в таблицу, по аналогии с тем, как вы делали вывод одного дела в модуле 8.
  // Функция должна вернуть html элемент с информацией и пользователе.У функции должен быть один аргумент - объект студента.

  function getStudentItem(studentObj) {
    const studentRow = document.createElement('tr');
    const fullNameTd = document.createElement('td');
    const facultyTd = document.createElement('td');
    const dateOfBirthTd = document.createElement('td');
    const yearsOfStudyTd = document.createElement('td');

    let yearStudent = getStudentAge(studentObj.birthDate);
    let studentCourse = formatStudentCourse(studentObj.studyStart);
    let studentBirthDateNormal = convertDateString(studentObj.birthDate);

    fullNameTd.textContent = `${studentObj.fullname}`; //из преобразованного массива studentObjChangeed
    facultyTd.textContent = `${studentObj.faculty}`;
    dateOfBirthTd.textContent = `${studentBirthDateNormal} (${yearStudent} лет)`;
    yearsOfStudyTd.textContent = `${studentCourse} `;

    studentRow.append(fullNameTd, facultyTd, dateOfBirthTd, yearsOfStudyTd);
    return studentRow; //вернем tr в виде обьекта
  }

  function erorWriting(inputElementName, errorText = "верное значение") {

    //!TODO добавляем ошибки в таблицу но они срабатывают по первому сработавшему if
    let listerrors = document.querySelector(".listerrors");
    let elementlisterror = document.createElement('li');
    elementlisterror.classList.add('list-group-item');
    elementlisterror.textContent = `Поле ${inputElementName} заполнено не корректно или пустое, введите ${errorText}`;;
    listerrors.append(elementlisterror);
  };

  //функция преобразования строки, первая с заглавной
  function capitalize(str) {
    let newStr = str.toLowerCase()
    return newStr.charAt(0).toUpperCase() + newStr.slice(1);
  }

  // Этап 4. Создайте функцию отрисовки всех студентов. Аргументом функции будет массив студентов.
  // Функция должна использовать ранее созданную функцию создания одной записи для студента.
  // Цикл поможет вам создать список студентов.Каждый раз при изменении списка студента вы будете вызывать эту функцию для отрисовки таблицы.
  function renderStudentsTable(studentsArray) {
    let studentObjChangeed = studentsArray.map(function (item) {
      return {
        fullname: `${capitalize(item.surName.trim())} ${capitalize(item.name.trim())} ${capitalize(item.middleName.trim())}`,
        birthDate: item.birthDate,
        faculty: capitalize(item.faculty.trim()),
        studyStart: item.studyStart
      }
    });
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = ''; //обнуляем таблицу
    for (item of studentObjChangeed) {
      let rowResult = getStudentItem(item);
      tableBody.append(rowResult);
    }
  }
  renderStudentsTable(studentsList);

  function addStudents() {
    const surName = document.querySelector(".surNameInput");
    const name = document.querySelector(".nameInput");
    const middleName = document.querySelector(".middleNameInput");
    const birthDate = document.querySelector(".birthDateInput");
    const faculty = document.querySelector(".facultyInput");
    const studyStart = document.querySelector(".studyStartInput");
    const button = document.querySelector(".btnAddStudents");


    //TODO: надо поработать над if-ами и выбора только те поля в которых возникает ошибка

    button.addEventListener('click', function () {
      let deleteelementlist = document.querySelector(".listerrors");
        //очищаем таблицу ошибок
        while (deleteelementlist.firstChild) {
          deleteelementlist.removeChild(deleteelementlist.firstChild);
        }

      if (surName.value.trim() === '' && name.value.trim() === '' && middleName.value.trim() === '' &&
        birthDate.value < "1900-01-01" && faculty.value.trim() === '' && (studyStart.value < 2000 || studyStart.value > 2023)) {
        erorWriting("");
      }
      if (surName.value.trim() === '') {
        erorWriting("Фамилия", "Фамилию");
      }
      if (name.value.trim() === '') {
        erorWriting("Имя", "Имя");
      }
      if (middleName.value.trim() === '') {
        erorWriting("Отчество", "Отчество");
      }
      if (birthDate.value < "1900-01-01") {
        erorWriting("Дата рождения", "верную дату, дата рождения должна быть больше или равна 01.01.1900");
      }
      if (faculty.value.trim() === '') {
        erorWriting("Факультет", "Факультет");
      }
      if (studyStart.value < 2000 || studyStart.value > 2023) {
        erorWriting("Год", "год в диапазоне с 2000 по 2023");
      }

      else {
        let deleteelementlist = document.querySelector(".listerrors");
        while (deleteelementlist.firstChild) {
          deleteelementlist.removeChild(deleteelementlist.firstChild);
        }

        studentsList.push({
          surName: surName.value.trim(),
          name: name.value.trim(),
          middleName: middleName.value.trim(),
          birthDate: birthDate.value,
          faculty: faculty.value.trim(),
          studyStart: studyStart.value
        });

        surName.value = ''
        name.value = ''
        middleName.value = ''
        birthDate.value = ''
        faculty.value = ''
        studyStart.value = ''
        console.table(studentsList);
      }

      //отрисовка массива
      renderStudentsTable(studentsList);
    });
  }
  addStudents();

  // Этап 5. Создайте функцию сортировки массива студентов и добавьте события кликов на соответствующие колонки.
  //сортировка массива

  const sortUsers = (arr, prop, dir = false) => arr.sort((a, b) => (!dir ? a[prop] < b[prop] : a[prop] > b[prop]) ? -1 : 0);

  //сортировка массива
  function arraySortedList(array, propArray, element) {
    let elementNeedSort = document.getElementById(element);
    // boolValueDataSet является DOMStringMap, и имя настраиваемого атрибута данных data-test-value будет доступно
    // через HTMLElement.dataset. testValue (или HTMLElement.dataset ["testValue"])
    let boolValueDataSet = elementNeedSort.dataset.info === 'true' ? true : false;
    elementNeedSort.addEventListener('click', function () {
      renderStudentsTable(sortUsers(array, propArray, boolValueDataSet));
      boolValueDataSet = !boolValueDataSet;
      if (!boolValueDataSet) {
        elementNeedSort.dataset.info = "true"
      } else {
        elementNeedSort.dataset.info = "false"
      }
    })
  }

  arraySortedList(studentsList, "surName", "namebutton");
  arraySortedList(studentsList, "faculty", "namefaculty");
  arraySortedList(studentsList, "birthDate", "namebirth-date");
  arraySortedList(studentsList, "birthDate", "namestudiyear");


  // Этап 6. Создайте функцию фильтрации массива студентов и добавьте события для элементов формы. keyup
  //studentsList массив исходный

  //отрисовка инпутов для фильтров
  let filterName = document.querySelector(".name-filter");
  let filterFaculty = document.querySelector(".faculty-filter");
  let studyingStart = document.querySelector(".studying-start-filter");
  let studyingEnd = document.querySelector(".studying-end-filter");


  //фильтрация по каждому полю
  function filterArray(arr) {
    let newArr = [...arr];
    if (filterName.value !== '') {
      newArr = newArr.filter(function (item) {
        return (item.surName + " " + item.name + " " + item.middleName).toLowerCase().includes((filterName.value).toLowerCase());
      })
    }
    if (filterFaculty.value !== '') {
      newArr = newArr.filter(function (item) {
        return (item.faculty).toLowerCase().includes((filterFaculty.value).toLowerCase());
      })
    }
    if (studyingStart.value !== '') {
      newArr = newArr.filter(function (item) {
        return (String(item.studyStart)).includes(studyingStart.value);
      })
    }
    if (studyingEnd.value !== '') {
      newArr = newArr.filter(function (item) {
        return (String(item.studyStart + 4)).includes((studyingEnd.value));
      })
    }
    return newArr;
  }

  const filterInputs = [
    document.getElementById('name-filter'),
    document.getElementById('faculty-filter'),
    document.getElementById('studying-start-filter'),
    document.getElementById('studying-end-filter')
  ];

  //Фильтрация
  filterInputs.forEach((input) => {
    input.addEventListener("input", function () {
      let arrayForSorting = filterArray(studentsList);
      //рендерим и сортируем новый массив обьектов
      setTimeout(() => {
        renderStudentsTable(arrayForSorting);
      }, 1000);

      arraySortedList(studentsList, "surName", "namebutton");
      arraySortedList(studentsList, "faculty", "namefaculty");
      arraySortedList(studentsList, "birthDate", "namebirth-date");
      arraySortedList(studentsList, "birthDate", "namestudiyear");
    })
  }
  );

})();


