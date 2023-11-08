package com.example.demo;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1")
public class MediaController {
	@Autowired
	private MediaRepo mediaRepo;
	
	@GetMapping("/posts")
	public List<Media> getAllMedia(){
		return mediaRepo.findAll();
	}
	
	@PostMapping("/posts")
	public Media addMedia(@RequestBody Media media) {
		mediaRepo.save(media);
		return media;
	}
	
	@DeleteMapping("/posts/{id}")
	public String deleteMedia(@PathVariable Long id) {
		Media med=mediaRepo.getOne(id);
		mediaRepo.delete(med);
		return "deleted";
	}

}
