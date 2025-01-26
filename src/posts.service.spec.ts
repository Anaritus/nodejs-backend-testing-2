import { Post, PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    const getTexts = (posts: Post[]) => {
      return posts.map((post) => ({ text: post.text }));
    };

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      const foundPosts = getTexts(postsService.findMany());
      expect(foundPosts).toEqual(posts);
    });

    it("should return correct posts for skip and limit options", () => {
      let foundPosts: Post[];

      foundPosts = postsService.findMany({ skip: 0 });
      expect(getTexts(foundPosts)).toEqual(posts);

      foundPosts = postsService.findMany({ skip: 2 });
      expect(getTexts(foundPosts)).toEqual(posts.slice(2));

      foundPosts = postsService.findMany({ skip: 4 });
      expect(getTexts(foundPosts)).toEqual(posts.slice(4));

      foundPosts = postsService.findMany({ limit: 0 });
      expect(getTexts(foundPosts)).toEqual(posts.slice(0, 0));

      foundPosts = postsService.findMany({ limit: 2 });
      expect(getTexts(foundPosts)).toEqual(posts.slice(0, 2));

      foundPosts = postsService.findMany({ limit: 4 });
      expect(getTexts(foundPosts)).toEqual(posts.slice(0, 4));
    });

    // реализуйте недостающие тест-кейсы
    it("should check skip and limit to be reasonable", () => {
      // skip should be non negative
      expect(postsService.findMany({ skip: -1 })).toThrow();

      // skip + limit should be no more than length
      expect(postsService.findMany({ skip: 4, limit: 4 })).toThrow();

      // skip should not be nan
      expect(postsService.findMany({ skip: NaN })).toThrow();

      // limit should not be nan
      expect(postsService.findMany({ limit: NaN })).toThrow();
    });
  });
});

