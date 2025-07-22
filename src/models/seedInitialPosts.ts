import Post from "./Post";

export default async function seedInitialPosts() {
  try {
    const existing = await Post.findOne();

    if (!existing) {
      await Post.insertMany([
        {
          titulo: "O poder da curiosidade",
          conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras non lacinia quam. Suspendisse potenti. Pellentesque fermentum, ligula eget pretium imperdiet, purus nisi viverra nulla, nec pulvinar lacus tortor nec orci. Integer gravida purus eget mi fringilla, nec bibendum justo bibendum. Nullam nec justo vitae nunc commodo congue. In hac habitasse platea dictumst. Praesent et sapien a diam fringilla fermentum.",
          autor: "Ada Lovelace"
        },
        {
          titulo: "Descobrindo o desconhecido",
          conteudo: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur.",
          autor: "Alan Turing"
        },
        {
          titulo: "A simplicidade é a sofisticação máxima",
          conteudo: "Curabitur rhoncus, massa non consectetur dapibus, erat augue accumsan ex, sed gravida sem erat vitae nibh. Ut feugiat justo vel urna dapibus, nec varius lectus feugiat. Proin eget laoreet sapien. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In lacinia, diam sed tincidunt tincidunt, libero arcu facilisis est, sed fermentum mi nulla sed lorem.",
          autor: "Leonardo da Vinci"
        },
        {
          titulo: "O futuro pertence àqueles que acreditam",
          conteudo: "Aenean in libero id nisl tempor pretium. Nulla facilisi. Donec sit amet turpis sit amet urna ultricies varius. Fusce nec tellus sed arcu lacinia porta. Duis at suscipit mi. Maecenas convallis nulla at sapien blandit, ac porta massa sagittis. Cras a semper magna. Integer dignissim dui nec orci accumsan, non facilisis lorem tristique.",
          autor: "Marie Curie"
        },
        {
          titulo: "Pensar diferente é essencial",
          conteudo: "Praesent facilisis, lacus id tincidunt luctus, massa justo mattis velit, nec ultricies leo diam ut nibh. Vestibulum a dignissim metus. Integer et leo congue, lobortis eros a, facilisis enim. Nunc rhoncus leo id ante suscipit, et tempor nisi ultrices. Suspendisse potenti. Donec vitae tincidunt sapien, nec rutrum purus.",
          autor: "Steve Jobs"
        },
        {
          titulo: "Uma jornada de mil milhas começa com um passo",
          conteudo: "Donec porttitor, nisl et aliquet varius, enim orci facilisis turpis, in vehicula tortor magna ut elit. Nulla facilisi. Aliquam erat volutpat. Cras feugiat, sem a fermentum malesuada, nisl diam scelerisque nisl, ac dignissim est orci sit amet velit. Suspendisse viverra felis at nibh tincidunt, ac blandit orci malesuada.",
          autor: "Lao Tsé"
        },
        {
          titulo: "Na dúvida, experimente",
          conteudo: "Etiam suscipit ligula ac lorem posuere fermentum. Integer finibus, metus at feugiat fermentum, magna magna fermentum justo, at feugiat arcu arcu nec tellus. Donec placerat purus ac nulla tincidunt luctus. Quisque rhoncus nibh sed massa malesuada, ac tempor justo iaculis.",
          autor: "Richard Feynman"
        },
        {
          titulo: "A beleza está nos detalhes",
          conteudo: "Maecenas et tincidunt tortor. Integer at sapien id ipsum convallis congue. Vestibulum tempor, nibh vel bibendum lobortis, metus libero viverra enim, id cursus nisl leo sed elit. Morbi at sapien nec ex dapibus tristique. Vivamus sagittis sapien sit amet porta ornare. Aenean hendrerit purus sed nunc dictum congue.",
          autor: "Mies van der Rohe"
        },
        {
          titulo: "A arte de falhar rapidamente",
          conteudo: "Aliquam erat volutpat. Cras ut suscipit nisl. Integer pulvinar, risus nec pulvinar feugiat, purus tellus aliquam risus, a posuere elit ipsum ut odio. Sed congue risus eu massa tempor, vitae porta ligula euismod. Duis quis fermentum ipsum. Aenean nec bibendum sapien. Curabitur sed lacus sed neque tincidunt pretium.",
          autor: "Grace Hopper"
        },
        {
          titulo: "Conhecimento é poder",
          conteudo: "Integer ullamcorper semper est nec pharetra. Donec volutpat, risus nec tincidunt placerat, nulla elit malesuada turpis, a dictum enim turpis ac purus. Cras convallis nisl et turpis dignissim, ac convallis mi bibendum. Pellentesque sed lorem nec risus interdum fermentum at sed nibh.",
          autor: "Francis Bacon"
        }
      ]);

      console.log("Posts de exemplo criados com sucesso.");
    } else {
      console.log("Posts já existem, nenhum post de exemplo foi criado.");
    }
  } catch (error) {
    console.error("Erro ao inserir posts de exemplo:", error);
  }
}