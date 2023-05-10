/* Const == Construtor // ou seja construa uma grid */
const grid = document.querySelector('.grid');

const personagens = [
'Bowser',
'Goomba',
'Luigi',
'Mario e Luigi',
'Mario',
'Princesa-Peach',
'Shy Guy',
'Toad',
'Wario e Waluigi',
'Yoshi',
];

/* Criando uma função que cria elementos */
const createElement = (tag, className) =>{

/* Construir um elemento que vai usar um método documento  */
const element = document.createElement(tag);

/* Agora ele coloca a classe dentro do elemento */
element.className = className;

/* Por fim ele retorna o elemento */
return element;
}

    /* variaveis */
    let primeiraCard = '';
    let segundaCard = '';


    const checkEndGame = () => {
    /* Criado uma const para armazenar as cartas desabilitas que vamos procurar */
    const disabledCard = document.querySelectorAll('.disabled-card');

        /*Agora vamos ver se o numero/tamanho encontrado é o mesmo do total de cartas */
        if(disabledCard.length == 20){
            setTimeout(() => {
                alert('Parabéns, você venceu!!!');
            }, 400);
            

        }
    }

    const checkCards = () => {
        const primeiroPers= primeiraCard.getAttribute('data-personagens');
        const segundoPers = segundaCard.getAttribute('data-personagens');

        if(primeiroPers == segundoPers){
            primeiraCard.firstChild.classList.add('disabled-card')
            segundaCard.firstChild.classList.add('disabled-card')

            primeiraCard = '';
            segundaCard = '';

            /*Função para verificar se todas as cartas foram descobertas */
            checkEndGame();
        }else{

            setTimeout(() => {
                /* Acessar a classe e remove o atributo, e desvira a carta */
                primeiraCard.classList.remove('reveal-card');
                segundaCard.classList.remove('reveal-card');

                /*Seta as variaveis vazias novamente */
                primeiraCard = '';
                segundaCard = '';
            }, 500);

        }
    }


    /* Clicando ele mostra que foi clicado nas costas da carta o BACK  */
    const revealCard = ({target}) => {

        /* Se o pai (carta) possui uma classe (reveal-card) então ela ja foi revelada, portanto retorna e nao faz nada*/
        if(target.parentNode.className.includes('reveal-card')){
            return;
        }

        /* Se a variavel estiver vazia significa que o usuario ainda não escolheu */
        if(primeiraCard == ''){
            /* portanto vamos virar a carta */
            target.parentNode.classList.add('reveal-card');
            /* e salvar na variavel a carta clicada (target) */
            primeiraCard = target.parentNode;

        } else if (segundaCard == ''){
            target.parentNode.classList.add('reveal-card');
            segundaCard = target.parentNode;

            /*Criando função para comparar se as cartas são iguais */

            checkCards();

        }
    }

/* recebendo como paramêtro o personagem */
const createCard  = (personagens) => /* (=>) arrow function*/ {

    /* Chamando a função element, e esse element precisa dos dois parametros */
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    /* acessar a div do front, acessar a variavel atráves de String( `` ) e por o outro lado da carta*/ 
    front.style.backgroundImage = `url('ImagemMemoria/${personagens}.jpg')`;

    /*Agora é feito a estruturação, colocando o front e o back dentro da div card */
    card.appendChild(front);
    card.appendChild(back);

    /* No momento que as cartas são criadas posso gerar um evento listener (click) e adicionar a função reveal */
    card.addEventListener('click' , revealCard);

    /*Criando um atributo para indentificação da carta, e o valor é o personagem */
    card.setAttribute('data-personagens', personagens)

    return card;
}

const loadGame = () => {
    /* Duplicando as cartas. spread operator (...) funciona para espalhar os elementos de um array, dentro de outro */
    const personagensDuplicados = [ ...personagens, ...personagens ];

    /*Embaralhar o array ou shuffled array /// Math random gera um numero aleatorio entre 0 e 1  */
    const embaralharArray = personagensDuplicados.sort(() => Math.random() - 0.5);

    

    /* Ele percorre o array com o comando forEach  e vai criar uma carta para cada objeto no array */
    embaralharArray.forEach((personagens) => {

        const card = createCard(personagens);
        /* Aqui ele cria a carta e coloca dentro da grid */
        grid.appendChild(card);

    });
}

loadGame();