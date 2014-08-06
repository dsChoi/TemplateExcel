package kr.co.yht;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

import kr.co.yht.file.model.UploadFile;
import kr.co.yht.file.validator.FileValidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	
	 @Autowired  
	 FileValidator fileValidator;  
	  
	 
	 /**
	  * Simply selects the home view to render by returning its name.
	  */
	 @RequestMapping(value = "/index", method = RequestMethod.GET)
	 public String index(Locale locale, Model model) {
		 logger.info("Welcome home! The client locale is {}.", locale);
		 
		 Date date = new Date();
		 DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		 
		 String formattedDate = dateFormat.format(date);
		 
		 model.addAttribute("serverTime", formattedDate);
		 
		 return "index";
	 }
	 
	 /**
	  * Simply selects the home view to render by returning its name.
	  */
	 @RequestMapping(value = "/oauth", method = RequestMethod.GET)
	 public String oauth(Locale locale, Model model) {
		 logger.info("Welcome home! The client locale is {}.", locale);
		 
		 Date date = new Date();
		 DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);
		 
		 String formattedDate = dateFormat.format(date);
		 
		 model.addAttribute("serverTime", formattedDate);
		 
		 return "oauth";
	 }
	 
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		Date date = new Date();
		DateFormat dateFormat = DateFormat.getDateTimeInstance(DateFormat.LONG, DateFormat.LONG, locale);

		String formattedDate = dateFormat.format(date);

		model.addAttribute("serverTime", formattedDate);

		return "home";
	}
	
	 @RequestMapping("/fileUploadForm")  
	 public ModelAndView getUploadForm(  
	   @ModelAttribute("uploadFile") UploadFile uploadFile,  
	   BindingResult result) {  
	  return new ModelAndView("uploadForm");  
	 }  
	

	@RequestMapping("/fileUpload")
	public ModelAndView fileUploaded(@ModelAttribute("uploadedFile") UploadFile uploadedFile, BindingResult result) {
		InputStream inputStream = null;
		OutputStream outputStream = null;

		MultipartFile file = uploadedFile.getFile();
		fileValidator.validate(uploadedFile, result);

		String fileName = file.getOriginalFilename();

		if (result.hasErrors()) {
			return new ModelAndView("uploadForm");
		}

		try {
			inputStream = file.getInputStream();

			File newFile = new File("C:/dev/workspace_yht/ExcelUploadProject/src/main/webapp/WEB-INF/uploadFile/" + fileName);
			if (!newFile.exists()) {
				newFile.createNewFile();
			}
			outputStream = new FileOutputStream(newFile);
			int read = 0;
			byte[] bytes = new byte[1024];

			while ((read = inputStream.read(bytes)) != -1) {
				outputStream.write(bytes, 0, read);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return new ModelAndView("showFile", "message", fileName);
	}
}
